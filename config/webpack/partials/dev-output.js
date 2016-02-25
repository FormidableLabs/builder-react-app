"use strict";

var partial = require("webpack-partial").partial;
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT = process.cwd();

module.exports = function (config) {
  return partial(config, {
    output: {
      path: ROOT,
      filename: "bundle.js",
      publicPath: "/js/"
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin("style.css", {
        allChunks: true
      })
    ]
  });
};
