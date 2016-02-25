"use strict";

/**
 * Webpack frontend test (w/ coverage) configuration.
 */

var compose = require("lodash/fp/flow");
var testEntry = require("./partials/test-entry");
var testOutput = require("./partials/test-output");
var sourceMap = require("./partials/source-map");

var path = require("path");
var ROOT = process.cwd();

module.exports = compose(
  testEntry,
  testOutput,
  sourceMap
)({
  cache: true,
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    preLoaders: [
      // Manually instrument client code for code coverage.
      // https://github.com/deepsweet/isparta-loader handles ES6 + normal JS.
      {
        name: "isparta",
        test: /client\/.*\.jsx?$/,
        exclude: [
          path.join(ROOT, "test/"),
          path.join(ROOT, "node_modules/")
        ],
        loader: require.resolve("isparta-loader")
      }
    ]
  }
});
