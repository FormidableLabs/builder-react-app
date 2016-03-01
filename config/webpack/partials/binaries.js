"use strict";

var partial = require("webpack-partial").default;

module.exports = function (config) {
  return partial(config, {
    module: {
      loaders: [
        {
          name: "binary",
          test: /\.(png|svg|woff|woff2|ttf|eot|jpg|jpeg)$/i,
          loader: require.resolve("url-loader") + "?limit=10000"
        }
      ]
    }
  });
};
