_ = require 'underscore'
{ NODE_ENV, REDIS_URL, DEFAULT_CACHE_TIME } = require '../config'
redis = require 'redis'
@client = null

retry_strategy = (options) ->
  console.log('Retrying with', options)

  if options.error and options.error.code == 'ECONNREFUSED'
    # End reconnecting on a specific error and flush all commands with
    # a individual error
    return new Error('The server refused the connection')

  if options.total_retry_time > 1000 * 60 * 60
    # End reconnecting after a specific timeout and flush all commands
    # with a individual error
    return new Error('Retry time exhausted')

  if options.attempt > 10
    # End reconnecting with built in error
    return undefined

  # Reconnect after
  Math.min options.attempt * 100, 3000

# Setup redis client
@connect = () ->
  return unless REDIS_URL?

  @client = redis.createClient(REDIS_URL, { retry_strategy: retry_strategy })
  @client.on 'error', (err) ->
    # Log + ignore the error; start up without Redis
    console.error(err)

# Convenience for setting a value in the cache with an expiry.
#
# @param {String} key
# @param {String} val
# @param {Number} expiresIn Defaults to 30 mins
@set = (key, val, expiresIn = 1800) =>
  return unless @client?
  @client.set key, val
  @client.expire key, expiresIn

# Safe alias of get
#
# @param {String} key
# @param {Function} callback
@get = (key, callback = ->) =>
  return callback() unless @client?
  @client.get key, callback

# Safe alias of del
#
# @param {String} key
# @param {Function} callback
@del = (key, callback = ->) =>
  return callback() unless @client?
  @client.del key, callback

# Iterates through a hash and calls JSON.stringify on each value. This is useful
# when storing a big hash of models/collections to be deserialized later (e.g. on the fair page).
#
# @param {String} key Redis key
# @param {Object} hash

@setHash = (key, hash) =>
  return unless @client?
  serialized = {}
  serialized[k] = JSON.stringify(v) for k, v of hash
  @client.set key, JSON.stringify hash
  @client.expire key, DEFAULT_CACHE_TIME

# Retrieves a serialized hash from `setHash` and deserializes it into models and
# collections. Pass in a hash of key: Model/Colllection class pairs to indicate what each
# key gets deserialized into.
#
# e.g.
#
# cache.getHash 'fair:' + id, {
#   fair: require('../../models/fair')
#   artworks: require('../../collections/artworks')
# }, ->
#
# @param {String} key Redis key to GET
# @param {Object} hash key: Model/Collection pairs
# @param {Function} callack Calls back with (err, deserializedHash)

@getHash = (key, hash, callback = ->) =>
  return callback() unless @client?
  @client.get key, (err, json) ->
    return callback(err) if err
    if json
      data = JSON.parse json
      deserialized = {}
      for key, json of data
        klass = hash[key]
        deserialized[key] = if klass? then new klass(json) else json
      callback(null, deserialized) if callback
    else
      callback() if callback

@flushall = (callback = ->) =>
  return callback() unless @client?
  @client.flushall callback