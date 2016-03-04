"use strict";

var partial = require("webpack-partial").default;
var webpack = require("webpack");

module.exports = function (config) {
  return partial(config, {
    module: {
      plugins: [
        // Moment by default includes all locales - this ensures that only english is loaded.
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
      ]
    }
  });
};
