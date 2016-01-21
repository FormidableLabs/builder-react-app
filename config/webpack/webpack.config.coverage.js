"use strict";
/**
 * Webpack frontend test (w/ coverage) configuration.
 */
var path = require("path");
var _ = require("lodash");
var testCfg = require("./webpack.config.test");

var ROOT = process.cwd();

module.exports = _.merge({}, testCfg, {
  module: {
    preLoaders: [
      // Manually instrument client code for code coverage.
      // https://github.com/deepsweet/isparta-loader handles ES6 + normal JS.
      {
        test: /client\/.*\.jsx?$/,
        exclude: [
          path.join(ROOT, "test/"),
          path.join(ROOT, "node_modules/")
        ],
        loader: require.resolve("isparta-loader") + "?{ babel: { stage: 2 } }"
      }
    ]
  }
});


// RegExp(`${path.join(ROOT, "client")}/.*\.jsx?$`),
