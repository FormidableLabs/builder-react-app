"use strict";

/**
 * Webpack production configuration
 */

var partial = require("webpack-partial").partial;
var base = require("./partials/base");
var baseLoader = require("./partials/base-loader");
var appEntry = require("./partials/app-entry");
var prodOutput = require("./partials/prod-output");
var momentLocale = require("./partials/moment-locale");

var webpack = require("webpack");

module.exports = partial(
  {
    plugins: [
      new webpack.SourceMapDevToolPlugin(
        "../map/[file].map",
        "\n//# sourceMappingURL=http://127.0.0.1:3001/dist/map/[url]"
      )
    ]
  },
  base,
  baseLoader,
  appEntry,
  prodOutput,
  momentLocale
);
