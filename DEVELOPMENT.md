Development
===========

We use [builder][] and `npm` to control all aspects of development and
publishing.

As a preliminary matter so you can type `builder` instead of
`./node_modules/.bin/builder` for all commands, please update your shell to include
`./node_modules/.bin` in `PATH` like:

```sh
$ export PATH="${PATH}:./node_modules/.bin"
```

## Development

All development tasks consist of watching the app bundle and the test bundle.

Run the application with watched rebuilds:

```sh
$ builder run dev  # dev test/app server (OR)
$ builder run hot  # hot reload test/app server (OR)
$ builder run prod # run the "REAL THING" with watchers
```

From there you can see:

* App: [127.0.0.1:3000](http://127.0.0.1:3000/)
* Client tests: [127.0.0.1:3001/test/client/test.html](http://127.0.0.1:3001/test/client/test.html)

### Webpack Config

### moment

If you are including [moment][] in your project, it will by default include more
locales than just the `en` locale. All non-en locales will be filtered out by
default in the archetype's webpack config.


## General Checks

### In Development

During development, you are expected to be running either:

```sh
$ builder run dev
```

to build the lib and test files. With these running, you can run the faster

```sh
$ builder run check-dev
```

Command. It is comprised of:

```sh
$ builder run lint
$ builder run test-dev
```

Note that the tests here are not instrumented for code coverage and are thus
more development / debugging friendly.

### Continuous Integration

CI doesn't have source / test file watchers, so has to _build_ the test files
via the commands:

```sh
$ builder run check     # PhantomJS only
$ builder run check-cov # (OR) PhantomJS w/ coverage
$ builder run check-ci  # (OR) PhantomJS,Firefox + coverage - available on Travis.
```

Which is currently comprised of:

```sh
$ builder run lint      # AND ...

$ builder run test-base # PhantomJS only
$ builder run test-cov  # (OR) PhantomJS w/ coverage
$ builder run test-ci   # (OR) PhantomJS,Firefox + coverage
```

Note that `(test|check)-(cov|ci)` run code coverage and thus the
test code may be harder to debug because it is instrumented.

### Client Tests

The client tests rely on webpack dev server to create and serve the bundle
of the app/test code at: http://127.0.0.1:3001/assets/main.js which is done
with the task `builder run server-test` (part of `npm dev`).

#### Code Coverage

Code coverage reports are outputted to:

```
coverage/
  client/
    BROWSER_STRING/
      lcov-report/index.html  # Viewable web report
  func/
    lcov-report/index.html # Viewable web report
  server/
    rest/
      lcov-report/index.html # Viewable web report
    unit/
      lcov-report/index.html # Viewable web report

```


## Tests

The test suites in this project can be found in the following locations:

```
test/server
test/client
test/func
```

### Backend Tests

`test/server`

Server-side (aka "backend") tests have two real flavors -- *unit* and *REST*
tests. To run all the server-side tests, run:

```sh
$ builder run test-server
```

#### Server-side Unit Tests

`test/server/spec`

Pure JavaScript tests that import the server code and test it in isolation.

* Extremely fast to execute.
* Typically test pure code logic in isolation.

Run the tests with:

```sh
$ builder run test-server-unit
```

#### Server-side REST Tests

`test/server/rest`

REST tests rely on spinning up the backend web application and using an HTTP
client to make real network requests to the server and validate responses.

* Must set up / tear down the application web server.
* Issue real REST requests against server and verify responses.
* Fairly fast to execute (localhost network requests).
* Cover more of an "end-to-end" perspective on validation.

Your project will need to create a `base.spec.js` file to manage server setup/teardown.
See the archetype templates for an example:
[`base.spec.js`](./init/test/server/rest/base.spec.js)

Run the tests with:

```sh
$ builder run test-server-rest
```

### Frontend Tests

`test/client/spec`

Client-side (aka "frontend") unit tests focus on one or more client application
files in isolation. Some aspects of these tests:

* Extremely fast to execute.
* Execute via a test HTML driver page, not the web application HTML.
* Must create mock DOM and data fixtures.
* Mock out real browser network requests / time.
* Typically test some aspect of the UI from the user perspective.
* Run tests in the browser or from command line.
* May need to be bundled like your application code.

Before functional tests can be run, you will need to need to set up selenium
by running:

```sh
$ builder run install-dev
```

Build, then run the tests from the command line with:

```sh
$ builder run test-client
$ builder run test-client-cov   # With coverage
$ builder run test-client-dev   # (Faster) Use existing `builder run dev` watchers.
```

### Functional Tests

`test/func`

Functional (aka "integration", "end-to-end") tests rely on a full, working
instance of the entire web application. These tests typically:

* Are slower than the other test types.
* Take a "black box" approach to the application and interact only via the
  actual web UI.
* Test user behaviors in an end-to-end manner.

Your project will need to create a `base.spec.js` file to manage server setup/teardown.
See the archetype templates for an example:
[`base.spec.js`](./init/test/func/spec/base.spec.js)

Run the tests with:

```sh
$ builder run test-func
$ builder run test-func-cov   # With coverage
$ builder run test-func-dev   # (Faster) Use existing `builder run dev` watchers.
```

[builder]: https://github.com/FormidableLabs/builder
[builder usage]: https://github.com/FormidableLabs/builder#usage
[moment]: http://momentjs.com/
