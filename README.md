# Flipnote-Player

A web player and video converter for animations created with Flipnote Studio or Flipnote Studio 3D

![](https://raw.githubusercontent.com/jaames/flipnote-player/master/public/static/media/social_media_preview.png)

### Features

* Full support for both of the proprietary animation formats used by Flipnote Studio and Flipnote Studio 3D
* Built-in converters for exporting Flipnotes as high quality MP4 video (!!!), animated GIF, or static image sequences
* Multi-file upload support -- open multiple Flipnotes at once and browse through them with a nice thumbnail grid UI
* No server-side code whatsoever
* 100% free and open source :^)

### Background

Released in 2009, *Flipnote Studio* is an application for the Nintendo DSi which allows users to create flipbook-style animations with the console's touch screen, cameras and microphone. In 2013 it recieved a sequel on the Nintendo 3DS called *Flipnote Studio 3D*, which expanded upon the original's feature set and added the ability to use 3D depth.

Even though it has been several years since the last Flipnote Studio installment was released (and the online services for both apps have since been retired) there is still a large community of people actively creating Flipnotes thanks to fan-built services such as [Kaeru Gallery](https://gallery.kaeru.world/), [IPGFLip](https://ipgflip.xyz/) and [Sudomemo](https://www.sudomemo.net/). There's even several high-profile artists such as [Kéké](https://twitter.com/kekeflipnote) who are rocking Flipnote Studio on social media.

My hope is that this project will help the Flipnote community to continue sharing their work on social media :)

### Built With

* [flipnote.js](https://github.com/jaames/flipnote.js) (my Flipnote parsing library)
* [sudofont](https://github.com/Sudomemo/Sudofont) (for rendering certain custom characters that can be used in Nintendo DSi usernames)
* [ffmpeg.js](https://github.com/Kagami/ffmpeg.js/) (for handling video conversion -- I made a [modified build ](https://github.com/jaames/ffmpeg.js) that handles PCM audio and GIF input, among other things)
* [React](https://reactjs.com/)
* [React Router](https://reacttraining.com/react-router/)
* [React Transition Group](https://reactcommunity.org/react-transition-group/)
* [react-dropzone](https://react-dropzone.js.org/)
* [pullstate](https://github.com/lostpebble/pullstate)
* [Poi](https://poi.js.org/)
* [Sketch](https://sketchapp.com/) (for making graphics)

### Building

Copy `.env.example` to `.env`:

```
cp .env.example .env
```
Install dependencies:

```
npm install
```
Build production-ready assets in the `/dist` directory:

```
npm run build
```
Run development server:

```
npm run dev
```
Generate sample Flipnote manifest file

```
npm run manifest
```

### Acknowledgments

* Everyone acknowledged in the [flipnote.js readme](https://github.com/jaames/flipnote.js#Acknowledgments)
* [Kaeru Team](https://github.com/KaeruTeam) for providing helpful feedback and for their assistance with testing. 
* [Sudomemo](http://www.sudomemo.net/) for providing sample Flipnotes and hosting.
