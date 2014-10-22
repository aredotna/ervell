Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
UserBlocks = require '../../../collections/user_blocks.coffee'

connectResultsTemplate = -> require('../templates/connect_results.jade') arguments...

module.exports = class ConnectResultsView extends Backbone.View

  initialize: ->
    @collection = new UserBlocks null,
      user_slug: sd.CURRENT_USER.slug

    @collection.fetch
      data:
        per: 3
        filter:
          type: 'channel'

    @collection.on "sync", @render, @

    super

  render: ->
    @$el.html connectResultsTemplate(blocks: @collection.models)