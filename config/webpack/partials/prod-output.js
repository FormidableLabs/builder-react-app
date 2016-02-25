"use strict";

var partial = require("webpack-partial").partial;
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var CleanPlugin = require("clean-webpack-plugin");
var path = require("path");

var ROOT = process.cwd();

module.exports = function (config) {
  return partial(config, {
    output: {
      path: path.join(ROOT, "dist/js"),
      filename: "bundle.[hash].js"
    },
    plugins: [
      // Clean
      new CleanPlugin(["dist"]),

      // Optimize
      new webpack.optimize.DedupePlugin(),
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
      })
    ]
  });
};
