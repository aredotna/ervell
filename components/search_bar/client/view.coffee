Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
SearchBlocks = require '../../../collections/search_blocks.coffee'

module.exports = class SearchBarView extends Backbone.View

  events:
    'keyup #layout-header__search__input': 'onKeyUp'

  initialize: (options)->
    @$input = options.$input
    @collection = new SearchBlocks()

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
        console.log 'search'

  search: (e) ->
    e.preventDefault()

    return @reset() unless query = @getQuery()
    return if (query.length < 2) or (query is @lastQuery)

    # @$(".search-bar-clear").fadeIn()
    @$el.addClass('is-loading')

    @lastQuery = query

    @searchRequest.abort() if @searchRequest
    @searchRequest = @model.fetch
      data:
        q: query
        per: 4
      success: => @searchLoaded()

  getQuery: ->
    query = $.trim @$input.val()
    console.log 'getQuery', query
    if query.length then query else false