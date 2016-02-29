"use strict";

/**
 * Express web server.
 */
// Globals
var HOST = process.env.HOST || "127.0.0.1";
var defaultPort = 3000;
var PORT = process.env.PORT || defaultPort;
var RENDER_JS = true;
var RENDER_SS = true;

// Hooks / polyfills
require("babel/register");
// Prevent node from attempting to require .css files on the server
require.extensions[".css"] = function () { return null; };

var path = require("path");
var express = require("express");
var compress = require("compression");

var app = module.exports = express();
var util = require("./util");

// ----------------------------------------------------------------------------
// Setup, Static Routes
// ----------------------------------------------------------------------------
app.use(compress());

// Logger
var logger = require("express-bunyan-logger");
app.use(logger());

// Static libraries and application HTML page.
app.use("/js", express.static(path.join(__dirname, "../dist/js")));

// ----------------------------------------------------------------------------
// REST API
// ----------------------------------------------------------------------------
app.get("/api/base", function (req, res) {
  res.json({ base: util.getBase() });
});

// ----------------------------------------------------------------------------
// Application.
// ----------------------------------------------------------------------------
// Client-side imports
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var Provider = require("react-redux").Provider;
var ReactRouter = require("react-router");
var match = ReactRouter.match;
var RouterContext = ReactRouter.RouterContext;

var createStore = require("../client/store/create-store");
var routes = require("../client/routes");
var clientApi = require("../client/utils/api");
var httpConstants = require("../shared/constants").http;

// Server-side React
var Index = React.createFactory(require("../templates/index"));
// Have to manually hack in the doctype because not contained with single
// element for full page.
var renderPage = function (component) {
  return "<!DOCTYPE html>" + ReactDOMServer.renderToStaticMarkup(component);
};

var renderReactPage = function (req, props, bootstrapData) {
  /*eslint max-statements:[2,25]*/
  // JS Bundle sources.
  var WEBPACK_TEST_BUNDLE = process.env.WEBPACK_TEST_BUNDLE;  // Switch to test webpack-dev-server
  var WEBPACK_DEV = process.env.WEBPACK_DEV === "true";       // Switch to dev webpack-dev-server
  var WEBPACK_HOT = process.env.WEBPACK_HOT === "true";

  // Render JS? Server-side? Bootstrap?
  var mode = req.query.__mode;
  var renderJs = RENDER_JS && mode !== "nojs";
  var renderSs = RENDER_SS && mode !== "noss";

  // JS/CSS bundle rendering.
  var devBundleJsUrl = "http://127.0.0.1:2992/js/bundle.js";
  var devBundleCssUrl = "http://127.0.0.1:2992/js/style.css";
  var bundleJs;
  var bundleCss;

  if (WEBPACK_TEST_BUNDLE) {
    bundleJs = renderJs ? WEBPACK_TEST_BUNDLE : null;
    bundleCss = devBundleCssUrl;
  } else if (WEBPACK_HOT) {
    // In hot mode, there is no CSS file because styles are inlined in a <style> tag
    bundleJs = renderJs ? devBundleJsUrl : null;
  } else if (WEBPACK_DEV) {
    bundleJs = renderJs ? devBundleJsUrl : null;
    bundleCss = devBundleCssUrl;
  } else {
    // First file is JS path.
    /* eslint-disable global-require */
    var stats = require("../dist/server/stats.json");
    bundleJs = path.join("/js", stats.assetsByChunkName.main[0]);
    bundleCss = path.join("/js", stats.assetsByChunkName.main[1]);
  }

  // Server-rendered client component.
  var content;
  if (renderSs) {
    var store = createStore(bootstrapData || {});
    content = ReactDOMServer.renderToString(
      React.createElement(Provider, { store: store },
        React.createElement(RouterContext, props)
      )
    );
  }

  // Response context
  return renderPage(new Index({
    bootstrap: JSON.stringify(bootstrapData),
    render: {
      js: renderJs
    },
    bundles: {
      js: bundleJs,
      css: bundleCss
    },
    content: content
  }));
};

var reactResponse = function (req, res, bootstrapData) {
  match({ routes: routes, location: req.url }, function (error, redirect, props) {
    if (error) {
      res.status(httpConstants.INTERNAL_SERVER_ERROR).send(error.message);
    } else if (redirect) {
      res.redirect(httpConstants.MOVED_TEMPORARILY, redirect.pathname + redirect.search);
    } else if (props) {
      res.status(httpConstants.OK).send(renderReactPage(req, props, bootstrapData));
    } else {
      res.status(httpConstants.NOT_FOUND).send("Not found");
    }
  });
};

/*
 * Example of route with bootstrapped data
 *
 * This example uses a shared client library to fetch the data using the same
 * API routes. Data could also be loaded using other means if the data is being
 * provided through this same express app.
 */
app.get("/", function (req, res) {
  clientApi
    .fetchBase()
    .then(function (base) {
      reactResponse(req, res, {
        base: base
      });
    })
    .catch(function (err) { res.status(httpConstants.INTERNAL_SERVER_ERROR).send(err); });
});

// Example of route with no bootstrapped data
app.get("/<%= componentPath %>", function (req, res) {
  reactResponse(req, res);
});

// Start helper.
app.start = function (port, callback) {
  port = port || PORT;
  clientApi.setBaseUrl(HOST, port);
  app.listen(port, callback || function () {});
};

// Actually start server if script.
/* istanbul ignore next */
if (require.main === module) {
  app.start();
}
