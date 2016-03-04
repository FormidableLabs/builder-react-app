"use strict";

var partial = require("webpack-partial").default;

module.exports = function (config) {
  return partial(config, {
    module: {
      loaders: [
        {
          name: "babel",
          test: /\.jsx?$/,
          exclude: [/node_modules/],
          loaders: [require.resolve("babel-loader") + "?optional=runtime"]
        }
      ]
    }
  });
};
