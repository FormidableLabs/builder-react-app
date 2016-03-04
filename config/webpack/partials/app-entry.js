"use strict";

var partial = require("webpack-partial").default;
var path = require("path");

var ROOT = process.cwd();

module.exports = function (config) {
  return partial(config, {
    context: path.join(ROOT, "client"),
    entry: "./app.jsx"
  });
};
