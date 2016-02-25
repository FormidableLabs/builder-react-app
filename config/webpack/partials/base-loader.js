"use strict";

var partial = require("webpack-partial").partial;
var cssLoader = require("./css-loader");
var babelLoader = require("./babel-loader");
var binaryLoader = require("./binary-loader");

module.exports = function (config) {
  return partial(
    config,
    cssLoader,
    babelLoader,
    binaryLoader
  );
};
