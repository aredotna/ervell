# Backbone Super Sync

An [isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) Backbone.sync adapter using [super-agent](https://github.com/visionmedia/superagent).

## Example

````javascript
var Backbone = require('backbone');
Backbone.sync = require('backbone-super-sync');
````

## Request timeouts

By default Backbone super sync will timeout requests that take longer than 10 seconds. This is to avoid
long hanging requests that can potentionally leak memory. You can set this to be longer for all requests, e.g.

````javascript
superSync.timeout = 60000; // All requests timeout after 1 minute
````

...or you can set this per-request by specifying it in options, e.g.

````
model.fetch({
  timeout: 5000,
  error: function(model, err) {
    if (err.message.match('timeout') alert('too slow!');
  }
});
````

## Built-in request caching

At [Artsy](http://artsy.net) we naively cache our server-side Backbone.sync requests. You can configure Backbone Super Sync to do this by setting `superSync.cacheClient = client`. If the `cache: true` option is set in a `model.fetch`, Backbone Super Sync will use the `cacheClient` to cache GET requests. The `client` API is based off of [node-redis](https://github.com/mranney/node_redis) but you could easily leverage this API to roll your own caching mechanism.

e.g.

````javascript
memoryCache = {}
superSync.cacheClient = {
  set: function(key, val, callback) {
    memoryCache[key] = val;
    callback(null, 'OK');
  }),
  get: function(key, callback) {
    callback(null, memoryCache[key]);
  },
  expire: function(key, expiresIn, callback) {
    setTimeout(expiresIn / 1000, function() {
      memoryCache[key] = null;
      callback(null, 1);
    });
  }
}
// Cache expiry time. Uses seconds. Defaults to 3600 or 1 hour. You may
// also pass `cacheTime: Number` in the options of a fetch to set per-request.
superSync.defaultCacheTime = 60;

new Backbone.Model({ id: 'cach-me' }).fetch({
  cache: true,
  success: function() {}
})
````

Use at your own risk—remember [there are only two hard things](http://martinfowler.com/bliki/TwoHardThings.html).

## Modifying global Backbone.sync requests

In the past there was a helper `superSync.editRequest = function(req) {}`. This has been deprecated. If you would like to modify sync-wide requests you can simply wrap Backbone.sync again. For example:

````javascript
var Backbone = require('backbone');
var sync = Backbone.sync = require('backbone-super-sync');

Backbone.sync = function(method, model, options) {
  options.headers['x-xapp-token'] = 'foobar';
  return sync(method, model, options);
}
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `npm test`

## License

MIT
