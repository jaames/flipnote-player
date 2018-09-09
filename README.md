# Flipnote-Player

Released in 2009, *Flipnote Studio* is an application for the Nintendo DSi which allows users to create animations with the console's touch screen, cameras and microphone. In 2013 it recieved a sequel on the Nintendo 3DS called *Flipnote Studio 3D*, which expanded upon the original's feature set and added the ability to use 3D depth.

This web app can play both of the propritary animation formats used by the both Flipnote Studio and Flipnote Studio 3D -- provided that you have a relatively modern web browser \ o /

### Built With

* [flipnote.js](https://github.com/jaames/flipnote.js) (my Flipnote parsing library, you can find more technical info about how the Flipnote formats and parser work there)
* [Preact](https://preactjs.com/) (a lightweight React alternative with the same API)
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

* Make sure you have NodeJS and NPM installed
* Copy `.env.example` to `.env` (change the config variables if needed) 
* Install dependencies with `npm install`
* Use `npm run dev` to spin up a local dev server for testing
* Use `npm run build` to produce minified, production-ready assets in the `/build` directory.

Note: I'm still learning about react, so this codebase is likely to undergo some large changes as I refactor things. Please bear that in mind if you wish to contribute!

### Special Thanks

* Everyone acknowledged in the [flipnote.js readme](https://github.com/jaames/flipnote.js#Acknowledgments)
* [Kaeru Team](https://github.com/KaeruTeam) for providing helpful feedback and for their assistance with testing. 
* [Sudomemo](http://www.sudomemo.net/) for providing sample Flipnotes and hosting.
