#
# General collection
#
Backbone = require 'backbone'
sd = require("sharify").data
_ = require 'underscore'
Model = require("../models/base.coffee")
ModelLib = require '../lib/model_lib.coffee'

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
    new Backbone.Collection @where base_class: 'Block'

  next: (model) ->
    model = @onlyBlocks().find (block) ->
      parseInt(model.id) == parseInt(block.id)
    @onlyBlocks().at((@onlyBlocks().indexOf(model) + 1) % _.size(@onlyBlocks().models))

  prev: (model) ->
    model = @onlyBlocks().findWhere id: model.id
    index = @onlyBlocks().indexOf(model) - 1
    @onlyBlocks().at(if index > -1 then index else _.size(@onlyBlocks().models) - 1)

  last: ->
    @at @length - 1

  isEmpty: ->
    @models.length is 0
