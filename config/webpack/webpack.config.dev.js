"use strict";

/**
 * Webpack development configuration
 */

var partial = require("webpack-partial").partial;
var base = require("./partials/base");
var baseLoader = require("./partials/base-loader");
var appEntry = require("./partials/app-entry");
var devOutput = require("./partials/dev-output");
var sourceMap = require("./partials/source-map");

module.exports = partial(
  base,
  baseLoader,
  appEntry,
  devOutput,
  sourceMap
);
