# TODO: refactor ppm parser stuff because it's a f-cking mess
from ppm.scripts.dsi.ppmTools.ppmTools import ppmParser
from kwz.kwz import KWZParser, PALETTE
from PIL import Image
from io import BytesIO
import json
from pathlib import Path
from sys import argv
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

def get_kwz_thumb(parser):
  index = parser.thumb_index
  frame = parser.get_frame_image(index)
  colors = parser.get_frame_palette(index)
  img = Image.fromarray(frame, "P")
  img.putpalette([
    *PALETTE[colors[0]], 
    *PALETTE[colors[1]], 
    *PALETTE[colors[2]], 
    *PALETTE[colors[3]], 
    *PALETTE[colors[4]], 
    *PALETTE[colors[5]], 
    *PALETTE[colors[6]], 
  ])
  return img

assetRoot = Path(argv[1])
manifest = {"items": []}

with Path.open(assetRoot / "meta.json", mode="r") as metafile:
  assetMeta = json.loads(metafile.read())

  for index, item in enumerate(assetMeta["items"]):
    path = assetRoot / item["filename"]
    ext = path.suffix[1:]

    print("({0}/{1})".format(index + 1, len(assetMeta["items"])), "Decoding thumbnail frame from", path)

    if ext == "ppm":
      ppm = ppmImage(Path.open(path, mode="rb"))
      authorName = ppm.getAuthorName()
      img = ppm.getFrameImage(ppm.thumbFrameIndex)
      img.save(path.with_suffix(".png"))

    elif ext == "kwz":
      kwz = KWZParser(Path.open(path, mode="rb"))
      authorName = kwz.meta["current"]["username"]
      img = get_kwz_thumb(kwz)
      
    # img.save(path.with_suffix(".png"))
    img = img.convert("RGB")
    width, height = img.size
    img.thumbnail((width // 2, height // 2))
    img = img.convert("P", palette=Image.ADAPTIVE)
    imgBuffer = BytesIO()
    img.save(imgBuffer, format="png")
    imgData = imgBuffer.getvalue()

    del item["filename"]
    # create manifest entry
    manifest["items"].append({
      **item,
      "author": authorName,
      "ext": ext,
      "filestem": path.stem,
      "thumb": "data:image/png;base64," + b64encode(imgData).decode()
    })
  
# write manifest to file
json.dump(manifest, Path.open(assetRoot / "manifest.json", mode="w"))
print("Manifest file written to", assetRoot / "manifest.json")