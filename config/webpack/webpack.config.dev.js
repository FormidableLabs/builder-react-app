"use strict";

/**
 * Webpack development configuration
 */

var compose = require("lodash/fp/flow");
var css = require("./partials/css");
var babel = require("./partials/babel");
var binaries = require("./partials/binaries");
var appEntry = require("./partials/app-entry");
var devOutput = require("./partials/dev-output");
var sourceMap = require("./partials/source-map");

module.exports = compose(
  css,
  babel,
  binaries,
  appEntry,
  devOutput,
  sourceMap
)({
  cache: true,
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
});
