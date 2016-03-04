Development
===========

All development tasks and common workflows can be found in the
[builder-react-app][] archetype [development guide][arch-dev].

## Development

Notes on the development workflow in addition to the functionality
provided by the archetype are outlined below.

### Server-side Unit Tests

`test/server/spec`

Programming notes:

* Contains a Sinon [sandbox][] **with** fake timers and servers.

#### Server-side REST Tests

`test/server/rest`

Programming notes:

* Test against a remote server with environment variables:
    * `TEST_REST_IS_REMOTE=true` (tests should only stub/spy if not remote)
    * `TEST_REST_BASE_URL=http://example.com/`

### Functional Tests

`test/func`

Programming notes:

* Use the [webdriverio][] Selenium client libraries.
* Use the [rowdy][] configuration wrapper for webdriverio / Selenium
* Test against a remote server with environment variables:
    * `TEST_FUNC_IS_REMOTE=true` (tests should only stub/spy if not remote)
    * `TEST_FUNC_BASE_URL=http://example.com/`

You can override settings and browser selections from the environment per
the [rowdy][] documentation. E.g.,

```sh
# Client and server logging.
$ ROWDY_OPTIONS='{ "client":{ "logger":true }, "server":{ "logger":true } }' \
  builder run test-func

# Switch to Chrome
$ ROWDY_SETTINGS="local.chrome" \
  builder run test-func
```

And you've published!

[builder-react-app]: https://github.com/FormidableLabs/builder-react-app
[arch-dev]: https://github.com/FormidableLabs/builder-react-app/blob/master/DEVELOPMENT.md
[sandbox]: http://sinonjs.org/docs/#sinon-sandbox
[webdriverio]: http://webdriver.io/
[rowdy]: https://github.com/FormidableLabs/rowdy