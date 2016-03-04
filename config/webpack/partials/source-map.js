"use strict";

var partial = require("webpack-partial").default;
var SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;

module.exports = function (config) {
  return partial(config, {
    plugins: [
      new SourceMapDevToolPlugin({
        test: /\.(css|js)($|\?)/,
        filename: "[file].map",
        append: "\n//# sourceMappingURL=[url]",
        module: true,
        columns: true
      })
    ]
  });
};