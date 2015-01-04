Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
UserBlocks = require '../../../collections/user_blocks.coffee'

ConnectResultsView = require './connect_results_view.coffee'

connectTemplate = -> require('../templates/connect.jade') arguments...

module.exports = class ConnectView extends Backbone.View

  events:
    'keyup .new-connection__search' : 'onKeyUp'
    'click .new-connection__done-button' : 'clear'

  initialize: (options)->
    @block = options.block
    @$input = @$('.new-connection__search')
    @render()
    super

  clear: (e)->
    e.stopPropagation()
    e.preventDefault()
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
    console.log 'query', query, @$input.val(), @$input
    if query.length
      return query
    else
      @searchUnloaded()
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

  focusSearch: ->
    @$('.new-connection__search').focus()

  renderChannels: =>
    @collection = new UserBlocks null,
      user_slug: sd.CURRENT_USER.slug

    @collection.fetch
      data:
        per: 3
        show_open: true
        filter:
          type: 'channel'

    new ConnectResultsView
      el: @$('.new-connection__search-results')
      block: @block
      collection: @collection