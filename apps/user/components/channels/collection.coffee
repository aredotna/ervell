sd = require("sharify").data
Backbone = require 'backbone'
{ keys, contains, filter, flatten } = require 'underscore'
Base = require '../../../../collections/base.coffee'
Blocks = require '../../../../collections/blocks.coffee'
params = require 'query-params'

module.exports = class UserChannelGroupCollection extends Base

  url: -> "/api/#{@userSlug}/channels?#{params.encode(@params.toJSON())}"

  parse: (data) -> data.channels

  initialize: (models, { @userSlug, @params }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires a userSlug' unless @userSlug?

    @params.on 'change', @prepareAndFetch, @

  prepareAndFetch: ->
    paginating = contains(keys(@params.changed), 'page') and keys(@params.changed).length is 1
    options = if paginating then { remove: false } else {}
    @fetch options

  onlyBlocks: ->
    blocks = flatten @map (group) ->
      filter group.get('kind').blocks, (block) -> block.klass is 'Block'

    new Blocks blocks
