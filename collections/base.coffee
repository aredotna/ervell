#
# General collection
#
Backbone = require 'backbone'
Collection = Backbone.Collection
sd = require("sharify").data
_ = require 'underscore'
Model = require("../models/base.coffee")
ModelLib = require '../lib/model_lib.coffee'

module.exports = class Base extends Collection

  model:Model

  _.extend @prototype, ModelLib

  sync: (method, model, options) ->
    if sd.CURRENT_USER
      if !options.headers
        options.headers = {}
      options.headers['X-AUTH-TOKEN'] = sd.CURRENT_USER.authentication_token
    super

  fetchUntilEnd: (options = {}) ->
    page = options.data?.page - 1 or 0
    opts = _.clone(options)
    fetchPage = =>
      @fetch _.extend opts,
        data: _.extend (opts.data ? {}), page: page += 1
        remove: false
        complete: ->
        success: (col, res) =>
          options.each? col, res

          if res.length < page * 12
            options.success?(@)
            options.complete?(@)
          else
            fetchPage()
        error: ->
          options.error? arguments...
          options.complete?()
    fetchPage()

  initialize: (models, options={})->
    @setOptions(options)
    super

  onlyBlocks: -> new Collection @where base_class: 'Block'

  next: (model) ->
    model = @onlyBlocks().find (block) -> model.id == parseInt(block.id)
    @onlyBlocks().at((@onlyBlocks().indexOf(model) + 1) % _.size(@onlyBlocks().models))

  prev: (model) ->
    model = @onlyBlocks().findWhere id: model.id
    index = @onlyBlocks().indexOf(model) - 1
    @onlyBlocks().at(if index > -1 then index else _.size(@onlyBlocks().models) - 1)

  last: ->
    @at @length - 1

  isEmpty: ->
    @models.length is 0
