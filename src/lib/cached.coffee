Cache = require './cache'

cache =
  get: (key) ->
    new Promise (resolve, reject) ->
      Cache.get key, (err, data) ->
        return reject(err) if err?
        return reject() unless data?
        resolve JSON.parse(data)

  set: (key, data, expires) ->
    serialized = JSON.stringify data
    Cache.set key, serialized, expires

cached = (key, expires = 1800, fn) ->
  new Promise (resolve, reject) ->
    cache.get key
      .then resolve
      .catch ->
        fn()
          .then (data) ->
            cache.set key, data, expires
            resolve data

          .catch reject

cached.cache = cache

module.exports = cached
