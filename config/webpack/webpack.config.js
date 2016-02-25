"use strict";

/**
 * Webpack production configuration
 */

var compose = require("lodash/fp/flow");
var css = require("./partials/css");
var babel = require("./partials/babel");
var binaries = require("./partials/binaries");
var appEntry = require("./partials/app-entry");
var prodOutput = require("./partials/prod-output");
var momentLocale = require("./partials/moment-locale");

var webpack = require("webpack");

module.exports = compose(
  css,
  babel,
  binaries,
  appEntry,
  prodOutput,
  momentLocale
)({
  cache: true,
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin(
      "../map/[file].map",
      "\n//# sourceMappingURL=http://127.0.0.1:3001/dist/map/[url]"
    )
  ]
});
