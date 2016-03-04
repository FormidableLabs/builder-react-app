"use strict";

/**
 * Webpack production configuration
 */

var compose = require("lodash/fp/flow");
var css = require("./partials/css");
var babel = require("./partials/babel");
var binaries = require("./partials/binaries");
var appEntry = require("./partials/app-entry");
var momentLocale = require("./partials/moment-locale");

var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var CleanPlugin = require("clean-webpack-plugin");
var path = require("path");

var ROOT = process.cwd();

module.exports = compose(
  css,
  babel,
  binaries,
  appEntry,
  momentLocale
)({
  cache: true,
  output: {
    path: path.join(ROOT, "dist/js"),
    filename: "bundle.[hash].js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  plugins: [
    // Clean
    new CleanPlugin(["dist"], {
      root: path.join(ROOT)
    }),

    // Optimize
    new webpack.optimize.UglifyJsPlugin(),

    // Extract CSS
    new ExtractTextPlugin("style.[hash].css"),

    // Meta, debug info.
    new webpack.DefinePlugin({
      // Signal production mode for React JS libs.
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new StatsWriterPlugin({
      // Context is relative to `output.path` / `dist/js`
      filename: "../server/stats.json"
    }),
    new webpack.SourceMapDevToolPlugin(
      "../map/[file].map",
      "\n//# sourceMappingURL=http://127.0.0.1:3001/dist/map/[url]"
    )
  ]
});
