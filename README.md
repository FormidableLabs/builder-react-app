Builder Archetype: React App
==================================

A React app archetype for [builder][].

This archetype provides a robust set of scripts and default configs for a
standard React app project. Included are scripts for

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

## Installation

To use the production and development workflows, install both this package
and the development module:

```sh
$ npm install --save builder-react-app
$ npm install --save-dev builder-react-app-dev
```

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
    setup.dev.js
    setup.js
  server/
    setup.js
.builderrc
package.json
```

## Usage Notes

### Node Server

This archetype provices three server tasks:

* `server` starts the node server
* `server-dev` # starts a dev server which updates as files change
* `server-hot` # starts the dev server w/ hot-reload

All server scripts run `server/index.js` with `ENV` vars to specify which
environment to run.

* `server`: no ENV vars
* `server-dev`: `WEBPACK_DEV=true`
* `server-hot`: `WEBPACK_HOT=true`

### Webpack Server



### Lint

All lint tasks use [`eslint`](http://eslint.org/) defaults published by
[walmartlabs](https://github.com/walmartlabs). This archetype uses
`walmart/es6-react` defaults for client scripts and `walmart/es5-node` defaults
for server scripts. See
[`eslint-config-defaults`](https://github.com/walmartlabs/eslint-config-defaults)
for specifics of each of these sets of default rules.

### Babel

This archetype does not currently specify its own `.babelrc`. Your project
should specify its own in the root directory if you want non-default Babel
settings (like using stage 0, for instance), use a `.babelrc` like so:

```json
{
  "stage": 0,
  "nonStandard": true
}
```

## Tasks

```
$ builder help builder-react-app

Usage:

  builder <action> <task(s)>

Actions:

  help, run, concurrent, envs

Flags: General

  --builderrc: Path to builder config file (default: `.builderrc`)

Tasks:

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
    [builder-react-app] eslint -c node_modules/builder-react-app/config/eslint/.eslintrc-server server

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

  start
    [builder-react-app] node server/index.js

  test
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

[builder]: https://github.com/FormidableLabs/builder
[development]: ./DEVELOPMENT.md
