"use strict";

/**
 * Webpack frontend test configuration.
 */

var partial = require("webpack-partial").partial;
var base = require("./partials/base");
var baseLoader = require("./partials/base-loader");
var testEntry = require("./partials/test-entry");
var testOutput = require("./partials/test-output");

module.exports = partial(
  base,
  baseLoader,
  testEntry,
  testOutput
);
