sd = require("sharify").data
{ keys, contains } = require 'underscore'
Backbone = require 'backbone'
params = require 'query-params'

module.exports = class UserChannelGroupCollection extends Backbone.Collection

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
