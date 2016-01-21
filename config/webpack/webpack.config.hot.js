"use strict";
/**
 * Webpack production configuration
 */
/*globals __dirname:false */
var base = require("./webpack.config.dev");

module.exports = {
  cache: true,
  context: base.context,
  entry: [
    "webpack/hot/only-dev-server",
    base.entry
  ],
  output: base.output,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loaders: [
          require.resolve("react-hot-loader"),
          require.resolve("babel-loader") + "?optional=runtime&stage=2"
        ]
      },
      {
        test: /\.css$/,
        loader: require.resolve("style-loader") + "!" + require.resolve("css-loader")
      },
      {
        test: /\.(png|svg|woff|woff2|ttf|eot)$/i,
        loader: require.resolve("url-loader") + "?limit=10000"
      }
    ]
  },
  resolve: base.resolve,
  devtool: "source-map",
  plugins: base.plugins
};
