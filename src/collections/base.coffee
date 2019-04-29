#
# General collection
#
Backbone = require 'backbone'
sd = require("sharify").data
_ = require 'underscore'
mediator = require "../lib/mediator.coffee"
Model = require "../models/base.coffee"
ModelLib = require "../lib/model_lib.coffee"

module.exports = class Base extends Backbone.Collection

  model: Model

  _.extend @prototype, ModelLib

  sync: (method, model, options) ->
    if sd.CURRENT_USER
      if !options.headers
        options.headers = {}
      options.headers['X-AUTH-TOKEN'] = sd.CURRENT_USER.authentication_token
    super

  initialize: (models, options={})->
    @setOptions(options)
    super

  onlyBlocks: ->
    new Backbone.Collection @filter (block) -> block.get('base_class') is 'Block' or block.get('class') is 'placeholder'

  next: (model) ->
    blocks = @onlyBlocks()
    model = blocks.find (block) -> parseInt(model.id) == parseInt(block.id)
    blocks.at((blocks.indexOf(model) + 1) % _.size(blocks.models))

  prev: (model) ->
    blocks = @onlyBlocks()
    model = blocks.findWhere id: model.id
    index = blocks.indexOf(model) - 1
    blocks.at(if index > -1 then index else _.size(blocks.models) - 1)

  last: ->
    @at @length - 1

  isEmpty: ->
    @models.length is 0
