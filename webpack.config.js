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
			"react-dom": "preact-compat"
		}
  }),
  match("*.js", [
    babel({
      presets: [
        ["env", {"modules": false}]
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
      name: "static/fonts/[name].[ext]?[hash:8]"
    })
  ]),
  match(["*.gif", "*.jpg", "*.jpeg", "*.png"], [
    url({
      limit: 8192,
      name: "static/media/[name].[ext]?[hash:8]"
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
        // "Add a copyright message or something silly here",
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
        removeComments: true,
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
      contentBase: path.join(__dirname, "./"),
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
    addPlugins([
      new CleanWebpackPlugin(["build"], {verbose: false}),
      new webpack.optimize.UglifyJsPlugin()
    ])
  ]),
]);