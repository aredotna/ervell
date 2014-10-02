#
# Collection for a group of Blocks fetched via a channel
#
_ = require 'underscore'
Blocks = require("./blocks.coffee")
sd = require("sharify").data
Block = require("../models/block.coffee")
mediator = require '../lib/mediator.coffee'

module.exports = class ChannelBlocks extends Blocks
  defaultOptions:
    per: 6
    page: 1

  model: Block

  url: -> "#{sd.API_URL}/channels/#{@slug}/contents"

  parse: (data)-> data.contents

  initialize: (models, options) ->
    @slug = options?.channel_slug
    super

  loadSkeleton: ->
    $.get "#{sd.API_URL}/channels/#{@slug}/skeleton?per=#{@options.per}&page=2", (response) =>
      @mergeSkeleton(response.contents)

  loadPage: (page)->
    console.log 'loadPage'
    $.get "#{sd.API_URL}/channels/#{@slug}/skeleton?per=#{@options.per}&page=#{page}", (response) =>
      @replacePlaceholders(response.contents, page, @loadDirection)

  mergeSkeleton: (models) ->

    (mergeSkeletonModel = =>
      unless models.length
        return @trigger 'merge:skeleton'

      model = models.shift()

      # if model doesn't exist, add
      if !@get(model.id)
        @add(model)

      _.defer mergeSkeletonModel

    )()

  replacePlaceholders: (models, page, direction) ->
    (replacePlaceholder = =>
      unless models.length
        return @trigger 'placeholders:replaced', page

      retrieveFn = if direction is 'up' then 'pop' else 'shift'

      model = models[retrieveFn]()

      @get(model.id).set(model, sort:false)

      _.defer replacePlaceholder
    )()