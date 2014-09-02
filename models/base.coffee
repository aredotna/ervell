#
# Base model to extend from
#
Backbone = require 'backbone'
Model = require("chaplin").Model
CurrentUser = require './current_user.coffee'
sd = require("sharify").data

module.exports = class Base extends Model

  initialize: (attributes, options={})->
    @setOptions(options)
    super

  get: (key, options)->
    if @calculated and _.include(_.keys(@calculated), key)
      return @calculated[key].apply(@, [options])
    else
      super

  fetch: (options = {})->
    @beginSync()
    success = options.success
    options.success = (model, response) =>
      @finishSync()
      success? model, response

    super options

  saveMeta: (key, value, options = {})->
    if not @has('metadata')
      @set('metadata', {})

    @get('metadata')[key] = value if key

    if value
      currentMeta = @get('metadata')
      currentMeta = {} if not currentMeta
      currentMeta[key] = value
      $.post "#{@get('urlRoot')}/metadata",
        metadata: currentMeta
        success: ->
          options.success() if options.success
    else
      $.ajax "#{@get('urlRoot')}/metadata/#{key}",
        type: "DELETE"
        success: ->
          options.success() if options.success


  sync: (method, model, options) ->
    xhr = Backbone.sync(method, model, options)
    mediator.syncManager.add model, xhr
    return xhr

  dispose: ->
    return if @disposed
    @clearDelayed()
    @abortSync()
    mediator.syncManager.remove @
    super

  serialize: ->
    data = super
    return data unless @calculated

    _.each _.keys(@calculated), (attr)=>
      data[attr] = @calculated[attr].apply(@)