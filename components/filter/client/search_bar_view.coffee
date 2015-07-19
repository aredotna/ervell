Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'

module.exports = class SearchBarView extends Backbone.View

  events:
    'keyup input'                             : 'onKeyUp'
    'tap .search-clear'                       : 'onClear'
    'tap .form__field__channel-filter--close' : 'onClear'

  initialize: ->
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
    @$el.removeClass 'is-active'

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

    return @onClear() unless query = @getQuery()
    return if (query.length < 2) or (query is @lastQuery)

    mediator.trigger 'stop:infinite'

    @$el.addClass('is-loading')

    @lastQuery = query

    @searchRequest.abort() if @searchRequest
    @searchRequest = @collection.fetch
      data:
        q: query
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

  focusSearch: ->
    @$input.focus()