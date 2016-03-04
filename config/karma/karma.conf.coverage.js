"use strict";
/*
 * Karma Configuration: "coverage" version.
 *
 * This configuration is the same as basic one-shot version, just with coverage.
 */
var webpackCovCfg = require("../webpack/webpack.config.coverage");
var path = require("path");

var ROOT = process.cwd();

module.exports = function (config) {
  /* eslint-disable global-require */
  require("./karma.conf")(config);
  config.set({
    reporters: ["spec", "coverage"],
    webpack: webpackCovCfg,
    coverageReporter: {
      reporters: [
        { type: "json", file: "coverage.json" },
        { type: "lcov" },
        { type: "text-summary" }
      ],
      dir: path.join(ROOT, "coverage/client")
    }
  });
};
