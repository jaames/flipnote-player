const webpack = require("webpack");
const {
  createConfig,
  match,
  babel,
  css,
  sass,
  devServer,
  url,
  file,
  postcss,
  uglify,
  extractText,
  addPlugins,
  setEnv,
  entryPoint,
  env,
  resolve,
  setContext,
  setOutput,
  sourceMaps
} = require("webpack-blocks");

const path = require("path");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
// require("dotenv").config();

const IS_DEV_ENV = process.env.NODE_ENV === "development";
const PUBLIC_PATH = IS_DEV_ENV ? "/" : "/projects/flipnote-player/";

module.exports = createConfig([
  setContext(path.resolve(__dirname, "src")),
  entryPoint({
    app: [
      "./index.js",
      "./css/app.scss"
    ]
  }),
  setOutput({
    path: path.resolve(__dirname, "build"),
    publicPath: PUBLIC_PATH,
    filename: "static/js/[name].js",
  }),
  resolve({
    extensions: [".js", ".css", ".scss"],
    modules: [
      path.resolve(__dirname, "node_modules"),
      "node_modules"
    ],
    alias: {
			"react": "preact-compat",
      "react-dom": "preact-compat",
      "util": path.resolve(__dirname, "src/js/util/"),
      "views": path.resolve(__dirname, "src/js/views/"),
      "components": path.resolve(__dirname, "src/js/components/"),
		}
  }),
  match("*.js", [
    babel({
      presets: [
        ["env", {"modules": false}],
        ["stage-2"]
      ],
      plugins: [
        ["transform-react-jsx", { "pragma": "h" }],
      ]
    }),
  ]),
  match("*.scss", [
    env("production", [
      postcss({
        plugins: [
          autoprefixer(),
          cssnano()
        ]
      }),
    ]),
    sass(),
    extractText("static/css/[name].css")
  ]),
  match(["*.eot", "*.ttf", "*.woff", "*.woff2", "*.svg"], [
    file({
      name: "./static/fonts/[name].[ext]?[hash:8]",
      publicPath: PUBLIC_PATH,
    })
  ]),
  match(["*.gif", "*.jpg", "*.jpeg", "*.png"], [
    url({
      limit: 8192,
      name: "./static/media/[name].[ext]?[hash:8]",
      publicPath: PUBLIC_PATH,
    })
  ]),
  addPlugins([
    new Dotenv({
      path: ".env",
      safe: true,
      systemvars: true,
    }),
    new webpack.BannerPlugin({
      banner: [
        "Flipnote Player",
        "-- -- -- -- -- --",
        "Web-based playback for animations created with the 2008 Nintendo DSiWare title 'Flipnote Studio'",
        "Created by James Daniel | github.com/jaames | @rakujira on Twitter",
        "Source code is on github: https://github.com/jaames/flipnote-player",
        "Flipnote Studio is (c) Nintendo Co Ltd",
        "-- -- -- -- -- --",
        "Version hash: [hash]",
        "Module hash: [chunkhash]",
      ].join("\n")
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "public/"),
      to: path.resolve(__dirname, "build/"),
      ignore: ["*.html", ".DS_Store"]
    }], {}),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: path.resolve(__dirname, "public/index.html"),
      minify: {
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ]),
  setEnv({
    NODE_ENV: process.env.NODE_ENV
  }),
  env("development", [
    sourceMaps(),
    devServer({
      port: process.env.PORT || 8080,
  		host: "0.0.0.0",
      hot: true,
      inline: true,
      contentBase: "./",
      open: false,
      compress: true,
      clientLogLevel: "none",
      watchContentBase: true,
      watchOptions: {
        ignored: /node_modules/
      }
    }),
    addPlugins([
      new webpack.HotModuleReplacementPlugin(),
    ]),
  ]),
  env("production", [
    sourceMaps(),
    addPlugins([
      new CleanWebpackPlugin(["build"], {verbose: false}),
      new webpack.optimize.UglifyJsPlugin({sourceMap: true})
    ])
  ]),
]);