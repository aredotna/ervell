# Backbone fetch cache

[![Build Status](https://travis-ci.org/madglory/backbone-fetch-cache.png?branch=master)](https://travis-ci.org/madglory/backbone-fetch-cache)

A Backbone plugin to cache calls to `Backbone.Model.prototype.fetch` and
`Backbone.Collection.prototype.fetch` in memory and `localStorage`.

Compatible with Backbone 1.0.0 and up.

## How it works
This plugin intercepts calls to `fetch` and stores the results in a cache object (`Backbone.fetchCache._cache`). If fetch is called with `{ cache: true }` in the options and the URL has already been cached the AJAX call will be skipped.

The local cache is persisted in `localStorage` if available for faster initial page loads.

The `prefill` option allows for models and collections to be filled with cache data just until the `fetch` operations are complete -- a nice way to make the app feel snappy on slower connections.

## What's wrong with browser caching for AJAX responses?
Nothing. This plugin is primarily for working with an API where you don't have control over response cache headers.

## Usage
Add the script to the page after backbone.js has been included:

```html
<script src="/path/to/backbone.js"></script>
<script src="/path/to/backbone.fetch-cache.js"></script>
```

or if you're using AMD, require the script as a module:

```js
require(['path/to/backbone.fetch-cache.js']);
```

Note that the AMD module depends on `underscore` and `backbone` modules being defined as it lists them as dependencies. If you don't have these mapped, you can do it by adding the following to your require config:

```js
requirejs.config({
  paths: {
    backbone: 'actual/path/to/backbone.js',
    underscore: 'actual/path/to/underscore.js'
  }
});
```

A note on [Zepto.js](http://zeptojs.com/). This plugin uses `jQuery.Deferred`
which is not included in Zepto. You'll need to add a third party
implementation of `jQuery.Deferred`, e.g. [Standalone-Deferred](https://github.com/Mumakil/Standalone-Deferred)

## Options
### `cache`
Calls to `modelInstance.fetch` or `collectionInstance.fetch` will be fulfilled from the cache (if possible) when `cache: true` is set in the options hash:

```js
myModel.fetch({ cache: true });
myCollection.fetch({ cache: true });
```

<hr />

### `prefill` and `prefillExpires`
This option allows the model/collection to be populated from the cache immediately and then be updated once the call to `fetch` has completed. The initial cache hit calls the `prefillSuccess` callback and then the AJAX success/error callbacks are called as normal when the request is complete. This allows the page to render something immediately and then update it after the request completes. (Note: the `prefillSuccess` callback _will not fire_ if the data is not found in the cache.)

```js
myModel.fetch({
  prefill: true,
  prefillSuccess: someCallback, // Fires when the cache hit happens
  success: anotherCallback // Fires after the AJAX call
});

myCollection.fetch({
  prefill: true,
  prefillSuccess: someCallback, // Fires when the cache hit happens
  success: anotherCallback // Fires after the AJAX call
});
```

This option can be used with the promises interface like so (note: the `progress` event _will not fire_ if the data is not found in the cache.):

```js
var modelPromise = myModel.fetch({ prefill: true });
modelPromise.progress(someCallback); // Fires when the cache hit happens
modelPromise.done(anotherCallback); // Fires after the AJAX call

var collectionPromise = myModel.fetch({ prefill: true });
collectionPromise.progress(someCallback); // Fires when the cache hit happens
collectionPromise.done(anotherCallback); // Fires after the AJAX call
```

`prefillExpires` affects `prefill` in the following ways:

1. If the cache doesn't hold the requested data, just fetch it (usual behaviour)
2. If the cache holds an expired version of the requested data, just fetch it (usual behaviour)
3. If the cache holds requested data that is neither expired nor prefill expired, just return it and don't do a fetch / prefill callback (usual cache behavior, unusual prefill behaviour)
3. If the cache holds requested data that isn't expired but is prefill expired, use the prefill callback and do a fetch (usual prefill behaviour)

```js
myModel.fetch({
  prefill: true,
  prefillExpires: 2000,
  prefillSuccess: someCallback, // Fires when the cache hit happens
  success: anotherCallback // Fires after the AJAX call
});

myCollection.fetch({
  prefill: true,
  prefillExpires: 2000,
  prefillSuccess: someCallback, // Fires when the cache hit happens
  success: anotherCallback // Fires after the AJAX call
});
```

<hr />

### `expires`

Cache vales expire after 5 minutes by default. You can adjust this by passing
`expires: <seconds>` to the fetch call. Set to `false` to never expire:

```js
myModel.fetch({ cache: true, expires: 60000 });
myCollection.fetch({ cache: true, expires: 60000 });

// These will never expire
myModel.fetch({ cache: true, expires: false });
myCollection.fetch({ cache: true, expires: false });
```

<hr />

### `localStorage`
By default the cache is persisted in localStorage (if available). Set `Backbone.fetchCache.localStorage = false` to disable this:

```js
Backbone.fetchCache.localStorage = false;
```

### Custom cache keys

By default the cache key is generated from the model's `url` property and the requests params:

```js
'/model/1?some=param'
```

This can be overridden with custom logic if required:

```js
// Instance is a Backbone.Model or Backbone.Collection, options are passed
// through form the fetch call
Backbone.fetchCache.getCacheKey = function(instance, options) {
  return instance.constructor.name + ':' + instance.get('id');
  // => UserModel:1
};
```

### `priorityFn`
When setting items in localStorage, the browser may throw a ```QUOTA_EXCEEDED_ERR```, meaning the store is full. Backbone.fetchCache tries to work around this problem by deleting what it considers the most stale item to make space for the new data. The staleness of data is determined by the sorting function ```priorityFn````, which by default returns the oldest item.

The default is:
```
Backbone.fetchCache.priorityFn = function(a, b) {
  if (!a || !a.expires || !b || !b.expires) {
    return a;
  }

  return a.expires - b.expires;
};
```

You can override this function with your own logic (in this case, returning the most recent item):
```
Backbone.fetchCache.priorityFn = function(a, b) {
  return b.expires - a.expires;
};
```

## Events

The `sync` event is triggered on a cache hit. A `cachesync` event is also triggered on Models and Collections, but only when a cache hit happens. This can be used if you need to differentiate between a server backed `sync` event and a cache backed event.

## Automatic cache invalidation
The cache item for a particular call will be cleared when a `create`, `update`, `patch` or `delete` call is made to the server. The plugin tries to be intelligent about this by clearing a model's collection cache if the model has a `.collection property`.

To achieve this, the plugin overrides `Backbone.Model.protoype.sync` and then calls the original method. If you are planning to override sync on a particular model then you should keep this in mind and make sure that you do it before the plugin runs. Overriding Backbone.sync directly should work fine.

## Manual cache invalidation
Sometimes you just need to clear a cached item manually. This can be called safely from anywhere in your application.

```js
Backbone.fetchCache.clearItem(myModel.url);
```

## Tests
You can run the tests by cloning the repo, installing the dependencies and
running `grunt jasmine`:

```
$ npm install
$ grunt jasmine
```

The default grunt task runs tests and lints the code.

```
$ grunt
```

## Releases
We will handle release versioning based on the changes. This will update `package.json`, `bower.json`, and also create a new git tag.

Once the version is bumped you can uglify the file so the version makes it into the uglified version.

```
$ grunt uglify
```

Now commit the changes, push to GitHub, and `npm publish`.
