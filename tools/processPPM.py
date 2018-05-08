# 
# Quick tool to extract thumbnails and author names from a bunch of flipnote PPMs
# Also compiles them into a single manifest file which is used for the file select screen
# 
# Requires ppmTools: 
#   pip install git+git://github.com/jaames/flipnote-tools.git&subdirectory=scripts/dsi/ppmTools
#   (install might be a bit finicky tbh, I couldn't figure out how to properly package it as a module...)
# 
# Usage: python3 processPPM.py <ppm directory path>

from pathlib import Path
from sys import argv
from ppmTools import ppmParser
from PIL import Image
from io import BytesIO
import json
from base64 import b64encode

class ppmImage(ppmParser.ppmParser):

    def getAuthorName(self):
      self.ppm.seek(0x0040)
      return self.ppm.read(22).decode("utf-16").strip("\x00")

    # Read /just/ the newFrame flag for a frame at a given index
    def isFrameNew(self, frameIndex):
        self.jumpToFrame(frameIndex)
        frameHeader = ord(self.ppm.read(1))
        return (frameHeader >> 7) & 0x1

    # Get an array of pixels for a specific frame
    def getRawFrameImage(self, frameIndex, colors={}, pixelDepth=24):
        isNew = self.isFrameNew(frameIndex)

        # If this frame is not a new frame, then we have to jump back and decode the previous frames to make the image
        if not isNew:
            # Run backwards through the frames from the given index, until we find one that has the "isNew" flag
            backTrack = 0
            while not isNew:
                backTrack += 1
                isNew = self.isFrameNew(frameIndex - backTrack)

            # Run forwards from the "isNew" frame, unpacking each one until we get back to the requested frame
            backIndex = frameIndex - backTrack
            while backIndex < frameIndex:
                # Unpack the frame, without merging the bitmaps into an RGB image to save time
                self.unpackFrame(backIndex)
                backIndex += 1

        # Get the requested frame as a 2D RGB array
        return self.unpackFrame(frameIndex, colors=colors, pixelDepth=pixelDepth)

    # Get an image object for a specific frame
    def getFrameImage(self, frameIndex):
        # use palette indecies when building up the image buffer from the ppm - results in less memory usage
        colors = {
            "black": b"\x00",
            "white": b"\x01",
            "blue":  b"\x02",
            "red":   b"\x03",
        }
        # palette colors in (r, g, b)
        palette = [
            # black
            14, 14, 14,
            # white
            255, 255, 255,
            # blue
            0, 0, 250,
            # red
            250, 0, 0,
        ]
        img = Image.fromarray(self.getRawFrameImage(frameIndex, colors=colors, pixelDepth=8), "P")
        img.putpalette(palette)
        return img

ppmDirectory = Path(argv[1])
manifest = {"items": []}

with Path.open(ppmDirectory / "list.txt", mode="r") as listfile:
  lst = [path.strip() for path in listfile.readlines() if not path[0] == "#"]
  for i, path in enumerate(lst):
    path = ppmDirectory / path
    ppm = ppmImage(Path.open(path, mode="rb"))

    print("({0}/{1})".format(i+1, len(lst)), "Decoding thumbnail frame from", path)

    # extract thumbnail image + write to file
    img = ppm.getFrameImage(ppm.thumbFrameIndex)
    img.save(path.with_suffix(".png"))
    # also write image to a buffer so we can embed it in the manifest
    imgBuffer = BytesIO()
    img.save(imgBuffer, format="PNG")

    # create manifest entry
    manifest["items"].append({
      "author": ppm.getAuthorName(),
      "filestem": path.stem,
      "thumb": "data:image/png;base64," + b64encode(imgBuffer.getvalue()).decode()
    })

# write manifest to file
json.dump(manifest, Path.open(ppmDirectory / "manifest.json", mode="w"))
print("Manifest file written to", ppmDirectory / "manifest.json")