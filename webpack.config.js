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
  customConfig,
  setOutput,
  sourceMaps
} = require("webpack-blocks");

const path = require("path");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const VERSION = require("./package.json").version;
// require("dotenv").config();

const IS_DEV_ENV = process.env.NODE_ENV === "development";

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
    publicPath: "/",
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
      "assets": path.resolve(__dirname, "src/assets"),
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
  match(["*.eot", "*.ttf", "*.woff", "*.woff2"], [
    file({
      name: "./static/fonts/[name].[ext]?[hash:8]",
    })
  ]),
  match(["*.gif", "*.jpg", "*.jpeg", "*.png"], [
    url({
      limit: 8192,
      name: "./static/media/[name].[ext]?[hash:8]",
    })
  ]),
  customConfig({
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "raw-loader"
        }
      ]
    }
  }),
  addPlugins([
    new Dotenv({
      path: ".env",
      safe: true,
      systemvars: true,
    }),
    new webpack.BannerPlugin({
      banner: [
        "flipnote-player v" + VERSION,
        "Web player for animations created with Flipnote Studio and Flipnote Studio 3D.",
        "2018 James Daniel (github.com/jaames | @rakujira)",
        "https://github.com/jaames/flipnote-player",
        "[hash]:[chunkhash]",
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
    // only use this in prod mode because it's slow as hell
    // -- seriously though, using phantomjs to render svg???
    // !IS_DEV_ENV ? new FaviconsWebpackPlugin({
    //   title: "Flipnote Player",
    //   logo: path.resolve(__dirname, "public/static/media/icon.svg"),
    //   prefix: "static/media/icons_[hash]/",
    //   statsFilename: "icon_stats_[hash].json",
    //   background: "#efefef",
    //   theme_color: "#efefef",
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: true,
    //     coast: false,
    //     favicons: true,
    //     firefox: true,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: true
    //   }
    // }) : false,
  ].filter(Boolean)),
  setEnv({
    NODE_ENV: process.env.NODE_ENV,
    VERSION: VERSION
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