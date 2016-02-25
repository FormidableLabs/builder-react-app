"use strict";

var partial = require("webpack-partial").partial;

module.exports = function (config) {
  return partial(config, {
    devtool: "source-map"
  });
};
