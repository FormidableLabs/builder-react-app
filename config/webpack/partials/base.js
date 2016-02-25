"use strict";

var partial = require("webpack-partial").partial;

// css-loader requires promises and must be polyfilled for use on Node 0.10.x
require("es6-promise").polyfill();

module.exports = function (config) {
  return partial(config, {
    cache: true,
    resolve: {
      extensions: ["", ".js", ".jsx"]
    }
  });
};
