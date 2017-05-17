Base = require './base.coffee'
Backbone = require 'backbone'
Backbone.LocalStorage = require 'backbone.localstorage'
Block = require '../models/block.coffee'

module.exports = class RecentConnections extends Backbone.Collection
  model: Block

  localStorage: new Backbone.LocalStorage RecentConnections

  shove: (model) ->
    @create(model.toJSON())

  unshove: (model) ->
    @sync('delete', @get model.id)
