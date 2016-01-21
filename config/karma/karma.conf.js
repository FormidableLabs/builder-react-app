"use strict";
/*
 * Karma Configuration: "full" version.
 *
 * This configuration runs a temporary `webpack-dev-server` and builds
 * the test files one-off for just a single run. This is appropriate for a
 * CI environment or if you're not otherwise running `npm run dev|hot`.
 */
var path = require("path");
var webpackCfg = require("../webpack/webpack.config.test");

var ROOT = process.cwd();
var MAIN_PATH = path.join(ROOT, "test/client/main.js");
var PREPROCESSORS = {};
PREPROCESSORS[MAIN_PATH] = ["webpack"];

module.exports = function (config) {
  // Start with the "dev" (webpack-dev-server is already running) config
  // and add in the webpack stuff.
  /* eslint-disable global-require */
  require("./karma.conf.dev")(config);

  // Overrides.
  config.set({
    preprocessors: PREPROCESSORS,
    files: [
      // Sinon has issues with webpack. Do global include.
      require.resolve("sinon/pkg/sinon"),

      // Test bundle (created via local webpack-dev-server in this config).
      MAIN_PATH
    ],
    webpack: webpackCfg,
    webpackServer: {
      port: 3010, // Choose a non-conflicting port.
      quiet: false,
      noInfo: true,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    }
  });
};
