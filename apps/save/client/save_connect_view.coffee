Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
ConnectView = require '../../../components/connect/client/connect_view.coffee'
ConnectionBlocks = require '../../../collections/connection_blocks.coffee'
SaveConnectResultsView = require './save_connect_results_view.coffee'

connectTemplate = -> require('../templates/connect.jade') arguments...

module.exports = class SaveConnectView extends ConnectView

  clear: -> # no op


  render: =>
    @$el.html connectTemplate()
    @focusSearch()
    @renderChannels()

  search: (e) ->
    e.preventDefault()

    return @reset() unless query = @getQuery()
    return if (query.length < 2) or (query is @lastQuery)

    # @$(".search-bar-clear").fadeIn()
    @$el.addClass('is-loading')

    @lastQuery = query

    marked = @collection.where marked: true

    @searchRequest.abort() if @searchRequest
    @searchRequest = @collection.fetch
      data:
        q: query
        per: 3
        show_open: true
        filter:
          type: 'channel'
      success: =>
        @collection.add marked
        @searchLoaded()

  renderChannels: =>
    @collection = new ConnectionBlocks null, user_slug: sd.CURRENT_USER.slug

    new SaveConnectResultsView
      el: @$('.new-connection__search-results')
      block: @block
      collection: @collection

    mediator.shared.recent_connections?.fetch()

    if mediator.shared.recent_connections.length
      models = _.map mediator.shared.recent_connections.models, (block)-> block.toJSON()
      @collection.add (_.last models, 3).reverse()
    else
      @collection.fetch data: per: 3
