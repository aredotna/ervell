{ extend } = require 'underscore'
Backbone = require 'backbone'
Backbone.LocalStorage = require 'backbone.localstorage'
Base = require './base.coffee'
Block = require '../models/block.coffee'

module.exports = class RecentConnections extends Backbone.Collection
  model: Block

  comparator: (model) ->
    -(model.get '__timestamp__')

  localStorage: new Backbone.LocalStorage RecentConnections

  @keyify: (model) ->
    "selected:#{model.get 'base_class'}:#{model.id}"

  shove: (model) ->
    timestamp = __timestamp__: new Date().getTime()
    attrs = extend {}, model.attributes, timestamp

    if existing = @get model.id
      existing.save attrs, silent: true
    else
      @create attrs

    @sort()

  append: (model) ->
    timestamp = __timestamp__: -(new Date().getTime())
    attrs = extend {}, model.attributes, timestamp
    @create attrs

  unshove: (model) ->
    @sync('delete', @get model.id)
