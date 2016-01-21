Builder Archetype: React App
==================================

A React app archetype for [builder][].

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

This archetype does not currently specify its own `.babelrc`. Your project
should specify its own in the root directory if you want non-default Babel
settings (like using stage 0, for instance). See [the recommended
settings](config/babel/.babelrc).

## Tasks

```
$ builder help builder-react-app

TODO
```

[builder]: https://github.com/FormidableLabs/builder
[development]: ./DEVELOPMENT.md
