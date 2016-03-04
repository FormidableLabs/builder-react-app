"use strict";

var partial = require("webpack-partial").default;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT = process.cwd();

module.exports = function (config) {
  return partial(config, {
    output: {
      path: ROOT,
      filename: "main.js",
      publicPath: "/assets/"
    },
    plugins: [
      new ExtractTextPlugin("style.css", {
        allChunks: true
      })
    ]
  });
};
