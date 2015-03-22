#
# Collection for a group of Blocks fetched via a channel
#
_ = require 'underscore'
Blocks = require "./blocks.coffee"
sd = require("sharify").data
Block = require "../models/block.coffee"
mediator = require '../lib/mediator.coffee'
params = require 'query-params'

module.exports = class ChannelBlocks extends Blocks
  defaultOptions:
    direction: 'desc'
    sort: 'position'
    per: 6

  model: Block

  url: -> "#{sd.API_URL}/channels/#{@slug}/contents?#{params.encode(@options)}"

  parse: (data)-> data.contents

  initialize: (models, options) ->
    @slug = options?.channel_slug
    super

  loadSkeleton: ->
    options = @options
    options.page = 2
    $.get "#{sd.API_URL}/channels/#{@slug}/skeleton?#{params.encode(options)}", (response) =>
      @mergeSkeleton(response.contents)

  loadPage: (page)->
    options = @options
    options.page = page
    $.get "#{sd.API_URL}/channels/#{@slug}/contents?#{params.encode(options)}", (response) =>
      @replacePlaceholders(response.contents, page, @loadDirection)

  mergeSkeleton: (models) ->

    (mergeSkeletonModel = =>
      unless models.length
        return @trigger 'merge:skeleton'

      model = models.shift()

      # if model doesn't exist, add
      if !@get(model.id)
        @add model

      _.defer mergeSkeletonModel

    )()

  replacePlaceholders: (models, page, direction) ->
    (replacePlaceholder = =>
      unless models.length
        return @trigger 'placeholders:replaced', page

      retrieveFn = if direction is 'up' then 'pop' else 'shift'

      model = new Block models[retrieveFn]()

      @get(model.id).set(model.attributes)
      mediator.trigger "model:#{model.id}:updated", model

      _.defer replacePlaceholder
    )()