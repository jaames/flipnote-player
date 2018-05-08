# Flipnote-Player

Released in 2009, [Flipnote Studio](https://www.nintendo.co.uk/Games/Nintendo-DSiWare/Flipnote-Studio-263126.html) is an application for the Nintendo DSi which allows users to create animations with the console's touch screen, cameras and microphone. 

This web app is able to parse and play the proprietary animation format (.ppm) used by Flipnote Studio, provided that you have a relatively modern web browser. \ o /

### Built With

* [flipnote.js](https://github.com/jaames/flipnote.js) (my Flipnote parsing library, you can find more technical info about how the Flipnote format and parser work there)
* [React](https://reactjs.org/) (actually [preact](https://preactjs.com/); a lightweight react alternative with the same API)
* [preact-router](https://github.com/developit/preact-router)
* [rc-slider](react-component.github.io/slider/)
* [react-toggle-switch](https://github.com/pgrimard/react-toggle-switch)
* [react-dropzone](https://react-dropzone.js.org/)
* [sudofont](https://github.com/Sudomemo/Sudofont) (for rendering certain custom characters that can be used in Nintendo DSi usernames)
* [Webpack](https://webpack.js.org/)
* [webpack-blocks](https://github.com/andywer/webpack-blocks)
* [Foundation](https://foundation.zurb.com/)
* [Sketch](https://sketchapp.com/) (for making graphics)

### Development Setup

**Note: I'm still learning about react, so this codebase is likely to undergo some large changes as I refactor things. Please bear that in mind if you wish to contribute.**

* Make sure you have NodeJS and NPM installed
* Copy `.env.example` to `.env` (change the config variables if needed) 
* Install dependencies with `npm install`
* Use `npm run dev` to spin up a local dev server for testing
* Use `npm run build` to produce minified, production-ready assets in the `/build` directory.

### Special Thanks

* Everyone acknowledged in the [flipnote.js readme](https://github.com/jaames/flipnote.js#Acknowledgments)
* [Kaeru Team](https://github.com/KaeruTeam) for providing helpful feedback and for their assistance with testing. 
* [Sudomemo](http://www.sudomemo.net/) for providing sample Flipnotes and hosting.
