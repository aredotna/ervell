#
# General collection
#
Collection = require("chaplin").Collection
sd = require("sharify").data
_ = require 'underscore'
Model = require("../models/base.coffee")
ModelLib = require '../lib/model_lib.coffee'

module.exports = class Blocks extends Collection

  model:Model

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

  next: (model) ->
    @at((@indexOf(model) + 1) % _.size(@models))

  prev: (model) ->
    index = @indexOf(model) - 1
    @at(if index > -1 then index else _.size(@models) - 1)

  last: ->
    @at @length - 1

  isEmpty: ->
    @models.length is 0
