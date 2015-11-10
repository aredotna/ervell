Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
ConnectionBlocks = require '../../../collections/connection_blocks.coffee'

ConnectResultsView = require './connect_results_view.coffee'

connectTemplate = -> require('../templates/connect.jade') arguments...

module.exports = class ConnectView extends Backbone.View

  events:
    'keyup .new-connection__search' : 'onKeyUp'
    'tap .new-connection__done-button' : 'onClear'

  initialize: ({ @block, @kind })->
    analytics.track.click 'Connect view opened'

    @$input = @$('.new-connection__search')
    @render()
    $(window).one('tap', @maybeClear)
    super

  maybeClear: (e)=>
    @clear() unless $(e.target).closest('.new-connection').length

  onClear: (e)->
    e.stopPropagation()
    e.preventDefault()
    @clear()

  clear: ->
    $(window).off('tap', @maybeClear)
    @$el.html ""
    @$el.removeClass 'is-active'
    @undelegateEvents()
    mediator.trigger "connection:#{@block.id}:complete"

  onKeyUp: (e)->
    e.preventDefault()
    e.stopPropagation()

    $('body').stop()

    switch e.keyCode
      when 13
        console.log 'enter'
      when 40
        console.log 'down'
      when 38
        console.log 'up'
      else
        @search(e)

  search: (e) ->
    e.preventDefault()

    return @reset() unless query = @getQuery()
    return if (query.length < 2) or (query is @lastQuery)

    # @$(".search-bar-clear").fadeIn()
    @$el.addClass('is-loading')

    @lastQuery = query

    @searchRequest.abort() if @searchRequest
    @searchRequest = @collection.fetch
      data:
        q: query
        per: 3
        show_open: true
        filter:
          type: 'channel'

      success: => @searchLoaded()

  getQuery: ->
    query = @$('input').val()?.trim()
    if query.length
      return query
    else
      false

  searchLoaded: ->
    @$el.removeClass('is-loading')
    @$el.addClass('is-active')
    @$el.addClass('has-results')

  searchUnloaded: ->
    @$el.removeClass('is-loading')
    @$el.removeClass('is-active')
    @$el.removeClass('has-results')

  render: =>
    @$el.html connectTemplate()
    @focusSearch()
    @renderChannels()

  reset: ->
    # nothing yet

  focusSearch: ->
    @$('.new-connection__search').focus()

  renderChannels: =>
    @collection = new ConnectionBlocks null, user_slug: sd.CURRENT_USER.slug

    new ConnectResultsView
      el: @$('.new-connection__search-results')
      block: @block
      collection: @collection
      kind: @kind

    mediator.shared.recent_connections?.fetch()

    if mediator.shared.recent_connections.length
      models = _.map mediator.shared.recent_connections.models, (block)-> block.toJSON()
      @collection.add (_.last models, 3).reverse()
    else
      @collection.fetch data: per: 3
