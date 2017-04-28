Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'

module.exports = class SearchBarView extends Backbone.View

  events:
    'keyup input' : 'onKeyUp'
    'tap .search-clear' : 'onClear'
    'tap .js-clear-input' : 'onClear'

  initialize: ({ @state })->
    @$input = @$('input')
    $(window).one('tap', @maybeClear)

  onClear: (e)->
    e?.stopPropagation()
    e?.preventDefault()
    @clear()
    @$('input').val ""
    @collection.reset()
    mediator.trigger 'start:infinite'

  clear: ->
    @collection.reset()
    @$el.removeClass 'is-active'
    mediator.shared.state.set is_searching: false

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

  updateOptions: (options) ->
    _.extend @collection.options, options

  search: (e) ->
    e.preventDefault()

    return @onClear() unless query = @getQuery()
    return if (query.length < 2) or (query is @lastQuery)

    mediator.shared.state.set is_searching: true

    mediator.trigger 'stop:infinite'

    @$el.addClass('is-loading')

    @lastQuery = query

    @updateOptions q: query, page: 1

    @searchRequest.abort() if @searchRequest
    @searchRequest = @collection.fetch success: => @searchLoaded()

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

  focusSearch: ->
    @$input.focus()