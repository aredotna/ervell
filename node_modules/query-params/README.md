# query-params
Very simple CommonJS-module to encode/decode query parameters

Convert object to query string or opposite. You need Browserify or similar to use this in a browser. It doesn't use ES5, so it should work in older browsers.

## Installation

`npm install query-params --save`

## Example usage

```js
var params = require('query-params');

params.encode({'foo': 'bar', 'a': 'b'}); // 'foo=bar&a=b'

params.decode('foo=bar&a=b'); // {'foo': 'bar', 'a': 'b'}
```
