# Flipnote-Player

This app is built around my JavaScript-and-WebGL-based Flipnote PPM parser,  flipnote.js

In addition, the following third-party tools and libraries were used:
* [React](https://reactjs.org/) (actually [preact](); a lightweight react alternative with the same API)
* [webpack](https://webpack.js.org/)
* [Foundation](https://foundation.zurb.com/)
* [element-react](https://eleme.github.io/element-react/#/en-US/quick-start)
* [Sketch](https://sketchapp.com/) (for making icons)

### Development setup

0) Make sure you have the prerequisites: NodeJS and NPM

1) Clone the repo and `cd` into it

2) Install dependencies with `npm install`

3) Copy `.env.example` to `.env` (change the config variables if needed), also 

4) Use `npm run dev` to spin up a local dev server for testing

5) Use `npm run build` to produce minified, production-ready assets in the `/build` directory.

### Acknowledgments

* Anyone who also contributed to reverse-engineering Flipnote Studio and the PPM format, including (but probably not limited to) [bricklife](http://ugomemo.g.hatena.ne.jp/bricklife/20090307/1236391313), [mirai-iro](http://mirai-iro.hatenablog.jp/entry/20090116/ugomemo_ppm), [harimau_tigris](http://ugomemo.g.hatena.ne.jp/harimau_tigris), [steven](http://www.dsibrew.org/wiki/User:Steven), [yellows8](https://twitter.com/ylws8), [PBSDS](https://github.com/pbsds), Midmad, [WDLMaster](https://hcs64.com/mboard/forum.php) and [jsa](https://github.com/thejsa). 
* [sudofox](https://sudomemo.net/) from sudomemo for provind 