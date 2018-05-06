# Flipnote-Player

Web player for animations created with [Flipnote Studio](https://www.nintendo.co.uk/Games/Nintendo-DSiWare/Flipnote-Studio-263126.html), a Nintendo DSiWare title from 2008.

This app is a GUI wrapper around my [flipnote.js](https://github.com/jaames/flipnote.js) library, you can find more technical details about the Flipnote format and the parser there.

### Built With

* [React](https://reactjs.org/) (actually [preact](https://preactjs.com/); a lightweight react alternative with the same API)
* [Webpack](https://webpack.js.org/)
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
