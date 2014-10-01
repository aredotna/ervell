#
# Collection for a group of Blocks fetched via a channel
#
_ = require 'underscore'
Blocks = require("./blocks.coffee")
sd = require("sharify").data
Block = require("../models/block.coffee")
mediator = require '../lib/mediator.coffee'

module.exports = class ChannelBlocks extends Blocks

  model: Block

  url: -> "#{sd.API_URL}/channels/#{@slug}/contents"

  parse: (data)-> data.contents

  initialize: (models, options) -> @slug = options?.channel_slug

  loadSkeleton: ->
    $.get "#{sd.API_URL}/channels/#{@slug}/skeleton?per=6&page=2", (response) =>
      console.log 'loadSkeleton', response
      @mergeSkeleton(response.contents)

  mergeSkeleton: (models) ->

    (mergeSkeletonModel = =>
      unless models.length
        return @trigger 'merge:skeleton'

      model = models.shift()

      # if model doesn't exist, add
      @add(model, silent: true) if !@get(model.id)

      _.defer mergeSkeletonModel

    )()

  replacePlaceholders: (models, page, direction, callback) ->
    (replacePlaceholder = =>
      unless models.length
        return mediator.publish 'placeholders:replaced', page

      retrieveFn = if direction is 'up' then 'pop' else 'shift'

      model = models[retrieveFn]()

      @get(model.id).set(model, sort:false)

      _.defer replacePlaceholder
    )()