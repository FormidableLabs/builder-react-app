"use strict";

/**
 * Webpack hot configuration
 */

var compose = require("lodash/fp/flow");
var babel = require("./partials/babel");
var binaries = require("./partials/binaries");
var appEntry = require("./partials/app-entry");
var devOutput = require("./partials/dev-output");
var sourceMap = require("./partials/source-map");

module.exports = compose(
  appEntry,
  babel,
  binaries,
  devOutput,
  sourceMap
)({
  cache: true,
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  entry: [
    "webpack/hot/only-dev-server"
  ],
  module: {
    loaders: [
      {
        name: "babel",
        loaders: [
          require.resolve("react-hot-loader")
        ]
      },
      {
        name: "style",
        test: /\.css$/,
        loader: require.resolve("style-loader") + "!" + require.resolve("css-loader")
      }
    ]
  }
});
