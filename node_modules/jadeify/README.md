# A Browserify Transform for Jade

**Jadeify** lets you use [Jade][] templates with [browserify][] in the simplest way possible:

```js
var template = require("./template.jade");

document.getElementById("my-thing").innerHTML = template({
    localVar: "value",
    anotherOne: "another value"
});
```

## Setup

When creating your browserify bundle, just add this line:

```js
bundle.transform(require("jadeify"));
```

or if you are a command line cowboy, something along the lines of

```js
browserify -t jadeify entry.js -o bundle.js
```

Note that this project peer-depends on Jade and each template will do `require("jade/runtime")`, so everything will just work: there's no need to add any Jade-related stuff to your bundle manually. (See below if your need to customize this.)

So yeah, now `require`ing any `.jade` files will give you back a template function. Have fun!

## Configuration

As with most browserify transforms, you can configure jadeify via the second argument to `bundle.transform`:

```js
bundle.transform(require("jadeify"), { compileDebug: true, pretty: true });
```

or inside your `package.json` configuration:

```json
{
    "name": "my-spiffy-package",
    "browserify": {
        "transform": [
            ["jadeify", { "compileDebug": true, "pretty": true }]
        ]
    }
}
```

Most options given to jadeify will be passed through to [Jade's API][].

### `runtimePath` option

There is one additional option, `runtimePath`, which can be used to customize the `require` statement inserted at the top of every resulting template. If supplied, instead of `require("jade/runtime")`, the given module ID will be required.

This can be useful if you are using jadeify as a dependency in a standalone library. For example, if your package `demo-package` depends on both `jade` and `jadeify`, you can do

```js
bundle.transform(require("jadeify"), { runtimePath: require.resolve("jade/runtime") });
```

inside your package. If your package is then located at `node_modules/demo-package`, and thus its `jade` dependency is located at `node_modules/demo-package/node_modules/jade`, this will ensure that the template files output by your library contain the equivalent of `require("demo-package/node_modules/jade/runtime")`, instead of the default `require("jade/runtime")`. This way your library completely encapsulates the presence of Jade, and doesn't require its installation at top level.

[Jade]: http://jade-lang.com/
[browserify]: https://github.com/substack/node-browserify
[Jade's API]: http://jade-lang.com/api/
