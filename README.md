Builder Archetype: React App [![npm package][npm-badge]][npm]
============================

A React app archetype for [builder][].

This archetype provides both a robust set of scripts and default configs for a
standard React app project as well as a [builder-init][] compatible app generator
for bootstrapping a new react app using this archetype.

Features provided by this archetype's scripts:

* spawning a node server with options for dev and hot-reload modes
* spawning a webpack server with options for dev and hot-reload modes
* running eslint using sensible default rules for client and server scripts and
  their associated tests
* building production assets
* running tests including client unit tests (karma), server REST and unit tests
  (mocha), and functional tests (mocha)
* generating coverage reports for client, server and functional tests using
  istanbul
* helper scripts that group common scripts together

Features provided by the builder-init compatible app generator

* uses the builder-react-app archetype for ease of script and config management
* redux for state management
* react-router for routing
* express for API and app routes
* server-side react rendering w/ bootstrapped data

## Installation

To use the production and development workflows, install both this package
and the development module:

```sh
$ npm install --save builder-react-app
$ npm install --save-dev builder-react-app-dev
```

Before functional tests can be run, you will need to also run:

```sh
$ builder run install-dev
```

See the [development][] guide for information about using the `builder` command.


## Generator

To bootstrap a new project from scratch with template files from this
archetype, you can use [builder-init][]:

```sh
$ npm install -g builder-init
$ builder-init builder-react-app
```

This will download this archetype, prompt you for several template data values
and inflate the [archetype templates](./init) to real files at a chosen
directory.


## Project Structure

See the [development][] guide for workflows associated with this archetype.

The archetype assumes a file structure like the following:

```
server
  index.js
test
  client/
    spec/
      *.jsx?
    main.js
    test.html
  func/
    spec/
      *.spec.js
    setup.dev.js
    setup.js
  server/
    rest/
      *.spec.js
    spec/
      *.spec.js
    setup.js
.builderrc
package.json
```

This matches the [`builder-init` templates](init) found in the source of this
archetype.


## Usage Notes

### Babel

This archetype does not currently specify its own `.babelrc`. Your project
should specify its own in the root directory if you want non-default Babel
settings (like using stage 2, for instance), use a `.babelrc` like so:

```json
{
  "stage": 2,
  "nonStandard": true
}
```

## Tasks

```
$ builder help

Usage:

  builder <action> <task(s)>

Actions:

  run, concurrent, envs, help

Flags: General

  --builderrc: Path to builder config file (default: `.builderrc`)

  --help: Display help and exit

  --version: Display version and exit

Tasks:

  npm:start
    [builder-react-app] node server/index.js

  build
    [builder-react-app] webpack --config node_modules/builder-react-app/config/webpack/webpack.config.js

  check
    [builder-react-app] builder concurrent lint test

  check-ci
    [builder-react-app] builder concurrent lint test-ci

  check-ci-win
    [builder-react-app] builder concurrent lint test-ci-win

  check-cov
    [builder-react-app] builder concurrent lint test-cov

  check-dev
    [builder-react-app] builder concurrent lint test-dev

  dev
    [builder-react-app] builder concurrent server-wds-test server-wds-dev server-dev

  hot
    [builder-react-app] builder concurrent server-wds-test server-wds-hot server-hot

  install-dev
    [builder-react-app] selenium-standalone install

  lint
    [builder-react-app] builder run lint-client && builder run lint-client-test && builder run lint-server && builder run lint-server-test

  lint-client
    [builder-react-app] eslint --ext .js,.jsx -c node_modules/builder-react-app/config/eslint/.eslintrc-client client templates

  lint-client-test
    [builder-react-app] eslint --ext .js,.jsx -c node_modules/builder-react-app/config/eslint/.eslintrc-client-test test/client

  lint-server
    [builder-react-app] eslint -c node_modules/builder-react-app/config/eslint/.eslintrc-server server shared

  lint-server-test
    [builder-react-app] eslint -c node_modules/builder-react-app/config/eslint/.eslintrc-server-test test/server test/func

  prod
    [builder-react-app] builder concurrent watch server sources

  server
    [builder-react-app] nodemon --watch client --watch server --watch templates --ext js,jsx server/index.js

  server-dev
    [builder-react-app] builder envs server '[{"WEBPACK_DEV":true}]'

  server-hot
    [builder-react-app] builder envs server '[{"WEBPACK_HOT":true}]'

  server-wds-dev
    [builder-react-app] webpack-dev-server --config node_modules/builder-react-app/config/webpack/webpack.config.dev.js --progress --colors --port 2992

  server-wds-hot
    [builder-react-app] webpack-dev-server --config node_modules/builder-react-app/config/webpack/webpack.config.hot.js --hot --progress --colors --port 2992 --inline

  server-wds-test
    [builder-react-app] webpack-dev-server --port 3001 --config node_modules/builder-react-app/config/webpack/webpack.config.test.js --colors

  sources
    [builder-react-app] http-server -p 3001 .

  test-base
    [builder-react-app] builder run test-client && builder run test-server && builder run test-func

  test-ci
    [builder-react-app] builder run test-client-ci && builder run test-server-cov && builder run test-func-cov

  test-ci-win
    [builder-react-app] builder run test-client-ci-win && builder run test-server && echo 'TODO(36) fix Appveyor test-func'

  test-client
    [builder-react-app] karma start node_modules/builder-react-app/config/karma/karma.conf.js

  test-client-ci
    [builder-react-app] karma start --browsers PhantomJS,Firefox node_modules/builder-react-app/config/karma/karma.conf.coverage.js

  test-client-ci-win
    [builder-react-app] karma start --browsers PhantomJS,IE node_modules/builder-react-app/config/karma/karma.conf.js

  test-client-cov
    [builder-react-app] karma start node_modules/builder-react-app/config/karma/karma.conf.coverage.js

  test-client-dev
    [builder-react-app] karma start node_modules/builder-react-app/config/karma/karma.conf.dev.js

  test-cov
    [builder-react-app] builder run test-client-cov && builder run test-server-cov && builder run test-func-cov

  test-dev
    [builder-react-app] builder run test-client-dev && builder run test-server && builder run test-func-dev

  test-func
    [builder-react-app] mocha --opts node_modules/builder-react-app/config/mocha/func/mocha.opts test/func/spec

  test-func-cov
    [builder-react-app] istanbul cover --config node_modules/builder-react-app/config/istanbul/.istanbul.func.yml _mocha -- --opts node_modules/builder-react-app/config/mocha/func/mocha.opts test/func/spec

  test-func-dev
    [builder-react-app] mocha --opts node_modules/builder-react-app/config/mocha/func/mocha.dev.opts test/func/spec

  test-server
    [builder-react-app] builder concurrent test-server-unit test-server-rest

  test-server-cov
    [builder-react-app] builder concurrent test-server-unit-cov test-server-rest-cov

  test-server-rest
    [builder-react-app] mocha --opts node_modules/builder-react-app/config/mocha/server/mocha.opts test/server/rest

  test-server-rest-cov
    [builder-react-app] istanbul cover --config node_modules/builder-react-app/config/istanbul/.istanbul.server-rest.yml _mocha -- --opts node_modules/builder-react-app/config/mocha/server/mocha.opts test/server/rest

  test-server-unit
    [builder-react-app] mocha --opts node_modules/builder-react-app/config/mocha/server/mocha.opts test/server/spec

  test-server-unit-cov
    [builder-react-app] istanbul cover --config node_modules/builder-react-app/config/istanbul/.istanbul.server-unit.yml _mocha -- --opts node_modules/builder-react-app/config/mocha/server/mocha.opts test/server/spec

  watch
    [builder-react-app] webpack --config node_modules/builder-react-app/config/webpack/webpack.config.js --watch --colors
```

[npm-badge]: https://img.shields.io/npm/v/builder-react-app.svg?style=flat-square
[npm]: https://www.npmjs.org/package/builder-react-app

[builder]: https://github.com/FormidableLabs/builder
[builder-init]: https://github.com/FormidableLabs/builder-init
[development]: ./DEVELOPMENT.md
