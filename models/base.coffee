#
# Base model to extend from
#
Backbone = require 'backbone'
moment = require 'moment'
_ = require 'underscore'
ModelLib = require '../lib/model_lib.coffee'
sd = require("sharify").data

module.exports = class Base extends Backbone.Model
  _.extend @prototype, ModelLib

  initialize: (attributes, options={})->
    @setOptions(options)
    super

  sync: (method, model, options) ->
    if sd.CURRENT_USER
      if !options.headers
        options.headers = {}
      options.headers['X-AUTH-TOKEN'] = sd.CURRENT_USER.authentication_token
    super

  get: (key, options)->
    if @calculated and _.include(_.keys(@calculated), key)
      return @calculated[key].apply(@, [options])
    else
      super

  saveMeta: (key, value, options = {})=>
    if not @has('metadata')
      @set('metadata', {})

    @get('metadata')[key] = value if key

    if value
      currentMeta = @get('metadata')
      currentMeta = {} if not currentMeta
      currentMeta[key] = value
      $.post "#{@urlRoot()}/metadata",
        metadata: currentMeta
        success: ->
          options.success() if options.success
    else
      $.ajax "#{@urlRoot()}/metadata/#{key}",
        type: "DELETE"
        success: ->
          options.success() if options.success

  smartTruncate: (text, limit=40) ->
    return unless text
    size = 0
    textArray = for token in text.split(' ')
      size += (token.length + 1)
      break if size > limit
      token
    textArray.join(" ") + (if text.length > limit then "..." else "")

  createdAtAgo:  -> moment(@get('created_at')).fromNow()

  updatedAtAgo:  -> moment(@get('updated_at')).fromNow()

  serialize: ->
    data = super
    return data unless @calculated

    _.each _.keys(@calculated), (attr)=>
      data[attr] = @calculated[attr].apply(@)

  push: (arg, val) ->
    arr = _.clone @get(arg)
    arr.push val
    @set arg, arr