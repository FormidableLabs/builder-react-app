/**
 * Webpack production configuration
 */
// css-loader requires promises and must be polyfilled for use on Node 0.10.x
require("es6-promise").polyfill();

var path = require("path");
var webpack = require("webpack");
var CleanPlugin = require("clean-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// Replace with `__dirname` if using in project root.
var ROOT = process.cwd();

// **Little Hacky**: Infer the filename and library name from the package name.
//
// Assumptions:
// - `package.json`'s `name` field is name of dist files.
// - PascalCased version of that name is exported class name.
var PKG = require(path.join(ROOT, "package.json"));
var libPath = (PKG.name || "").toLowerCase();
if (!libPath) { throw new Error("Need package.json:name field"); }
// PascalCase (with first character capitalized).
var libName = libPath
  .replace(/^\s+|\s+$/g, "")
  .replace(/(^|[-_ ])+(.)/g, function (match, first, second) {
    // Second match group is the character we want to change. Throw away first.
    return second.toUpperCase();
  });

module.exports = {
  cache: true,
  context: path.join(ROOT, "client"),
  entry: "./app.jsx",
  output: {
    path: path.join(ROOT, "dist/js"),
    filename: "bundle.[hash].js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loaders: [require.resolve("babel-loader") + "?optional=runtime&stage=2"]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          require.resolve("style-loader"),
          require.resolve("css-loader")
        )
      },
      {
        test: /\.(png|svg|woff|woff2|ttf|eot)$/i,
        loader: require.resolve("url-loader") + "?limit=10000"
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
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
      "process.env": {
        // Signal production mode for React JS libs.
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.SourceMapDevToolPlugin(
      "../map/[file].map",
      "\n//# sourceMappingURL=http://127.0.0.1:3001/dist/map/[url]"
    ),
    new StatsWriterPlugin({
      // Context is relative to `output.path` / `dist/js`
      filename: "../server/stats.json"
    })
  ]
};
