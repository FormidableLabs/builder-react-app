"use strict";

var partial = require("webpack-partial").default;
var path = require("path");

var ROOT = process.cwd();

module.exports = function (config) {
  return partial(config, {
    context: path.join(ROOT, "test/client"),
    entry: "./main",
    resolve: {
      alias: {
        // Allow root import of `client/FOO` from ROOT/client.
        client: path.join(ROOT, "client")
      }
    }
  });
};
