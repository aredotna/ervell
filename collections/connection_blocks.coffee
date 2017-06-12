# Collection for a group of results in a connection search

qs = require 'qs'
{ API_URL } = require('sharify').data
UserBlocks = require './user_blocks.coffee'

module.exports = class ConnectionBlocks extends UserBlocks
  defaultOptions:
    page: 1
    per: 20

  url: ->
    "#{sd.API_URL}/search/connection?#{qs.stringify @options}"

  initialize: (models, options) ->
    super
    @slug = options.user_slug

  comparator: (model) ->
    # For original connect component
    # TODO: Remove this once component is retired
    if model.get 'marked'
      1

    # When searched
    else
      model.get 'score'
