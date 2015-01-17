Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
SearchBlocks = require '../../../collections/search_blocks.coffee'

resultsTemplate = -> require('../templates/results.jade') arguments...

module.exports = class SearchBarView extends Backbone.View

  events:
    'keyup #layout-header__search__input' : 'onKeyUp'
    'click .layout-header__search__close' : 'clearSearch'
    'blur #layout-header__search__input'  : 'blurSearch'
    'focus #layout-header__search__input' : 'focusSearch'
    'click .search__results__see-all'     : 'fullResults'

  initialize: (options)->
    @$input = options.$input
    @$results = options.$results
    @collection = new SearchBlocks()
    @collection.url = "#{sd.API_URL}/search/channels"

  onKeyUp: (e)->
    e.preventDefault()
    e.stopPropagation()

    $('body').stop()

    switch e.keyCode
      when 13
        document.location.href = "/search/#{@getQuery()}"
      when 40
        console.log 'down'
      when 38
        console.log 'up'
      else
        @search(e)

  fullResults: (e)->
    e.stopPropagation()
    e.preventDefault()
    document.location.href = "/search/#{@getQuery()}"

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
        per: 4
      success: => @searchLoaded()

  getQuery: ->
    query = @$input.val()?.trim()
    if query.length
      return query
    else
      false

  searchLoaded: ->
    @$el.removeClass('is-loading')
    @$el.addClass('is-active')
    @$el.addClass('has-results')
    @$results.html resultsTemplate(results: @collection.models)

    mediator.trigger 'search:loaded'

  searchUnloaded: ->
    @$el.removeClass('is-loading')
    @$el.removeClass('is-active')
    @$el.removeClass('has-results')
    @$results.html ""

  blurSearch: (e) -> @$el.removeClass('is-active')

  clearSearch: ->
    @searchUnloaded()
    @$input.val ""

  focusSearch: (e)->
    @$el.addClass('is-active')
