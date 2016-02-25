"use strict";

/**
 * Webpack frontend test configuration.
 */

var compose = require("lodash/fp/flow");
var css = require("./partials/css");
var babel = require("./partials/babel");
var binaries = require("./partials/binaries");
var testEntry = require("./partials/test-entry");
var testOutput = require("./partials/test-output");

module.exports = compose(
  css,
  babel,
  binaries,
  testEntry,
  testOutput
)({
  cache: true,
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
});
