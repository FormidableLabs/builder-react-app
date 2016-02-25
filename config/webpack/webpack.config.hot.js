"use strict";

/**
 * Webpack hot configuration
 */

var partial = require("webpack-partial").partial;
var base = require("./partials/base");
var babelLoader = require("./partials/babel-loader");
var binaryLoader = require("./partials/binary-loader");
var appEntry = require("./partials/app-entry");
var devOutput = require("./partials/dev-output");
var sourceMap = require("./partials/source-map");

module.exports = partial(
  appEntry, // must come first for context
  function (config) {
    return partial(config, {
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
  },
  base,
  babelLoader,
  binaryLoader,
  devOutput,
  sourceMap
);
