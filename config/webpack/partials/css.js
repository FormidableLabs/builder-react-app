"use strict";

var partial = require("webpack-partial").partial;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (config) {
  return partial(config, {
    module: {
      loaders: [{
        name: "style",
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          require.resolve("style-loader"),
          require.resolve("css-loader")
        )
      }]
    }
  });
};
