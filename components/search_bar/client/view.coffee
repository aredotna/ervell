Backbone = require "backbone"
Backbone.$ = $
{ delay } = require 'underscore'
{ API_URL } = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
SearchBlocks = require '../../../collections/search_blocks.coffee'
analytics = require '../../../lib/analytics.coffee'
resultsTemplate = -> require('../templates/results.jade') arguments...

module.exports = class SearchBarView extends Backbone.View
  className: 'LayoutHeaderSearch'

  events:
    'keyup .js-layout-header-search-input': 'onKeyUp'
    'click .js-layout-header-search-input-close': 'clearSearch'
    'blur .js-layout-header-search-input': 'blurSearch'
    'focus .js-layout-header-search-input': 'focusSearch'
    'click .search__results__see-all': 'fullResults'

  initialize: (options) ->
    @$input = @$('.js-layout-header-search-input')
    @$results = @$('.js-layout-header-search-results')
    @collection = new SearchBlocks
    @collection.url = "#{API_URL}/search/channels"

  onKeyUp: (e) ->
    e.preventDefault()
    e.stopPropagation()

    $('body').stop()

    switch e.keyCode
      when 13
        @activateHighlighted e
      when 40
        @moveHighlight('down')
      when 38
        @moveHighlight('up')
      else
        @search(e)

  fullResults: (e) ->
    e.stopPropagation()
    e.preventDefault()

    if @getQuery()
      document.location.href = "/search/#{@getQuery()}"
    else
      document.location.href = "/explore?sort=random"

  reset: ->
    # nothing

  search: (e) ->
    e.preventDefault()

    return @reset() unless query = @getQuery()
    return if (query.length < 2) or (query is @lastQuery)

    @$el.addClass('is-loading')

    @lastQuery = query

    @searchRequest.abort() if @searchRequest
    @searchRequest = @collection.fetch
      data:
        q: query
        per: 6
      success: =>
        analytics.track.click "Search query"
        @searchLoaded()

  getQuery: ->
    query = @$input.val()?.trim()
    if query.length
      return query
    else
      false

  #
  # Highlight management
  #
  highlightFirst: ->
    @clearHighlight()
    @$('.search__results__result:first').addClass('is-active')

  activateHighlighted: (e) ->
    e.stopPropagation()
    $selected = @$('.is-active:first')
    if $selected.length
      action = $selected.data('action')
      if action and (action isnt "")
        mediator.publish(action)
      else
        document.location.href = @$('.is-active:first > a').attr('href')
    else
      @fullResults e

  moveHighlight: (direction) ->
    $container = @$el

    $items = $container.find('.search__results__result')

    $current = $items.filter('.is-active')
    $current = $items.has('.is-active') unless $current.length
    $current = false unless $current.length

    @clearHighlight()

    if $current
      index = $items.index($current)
      length = $items.length

      delta = if direction is 'down' then 1 else -1
      nextIndex = index + delta

      if (nextIndex > length - 1) then nextIndex = 0
      if (nextIndex < 0 ) then nextIndex = length - 1
    else
      nextIndex = 0

    $($items[nextIndex]).addClass('is-active')

    @scrollToHighlight()

  scrollToHighlight: ->
    $list =  @$el
    $highlighted = @$('.is-active:first')

    listBounds = $list[0].getBoundingClientRect()
    highlightBounds = $highlighted[0].getBoundingClientRect()

    curScroll = $list.scrollTop()
    if highlightBounds.top < listBounds.top
      scroll = curScroll - (listBounds.top - highlightBounds.top)
    else if highlightBounds.bottom > listBounds.bottom
      scroll = curScroll + (highlightBounds.bottom - listBounds.bottom)

    $list.scrollTop(scroll)

  clearHighlight: ->
    @$('.is-active').removeClass('is-active')

  searchLoaded: ->
    @$el.removeClass('is-loading')
    @$el.addClass('is-active')
    @$el.addClass('has-results')
    @$results.html resultsTemplate(results: @collection.models, query: @getQuery())
    mediator.trigger 'search:loaded'

  searchUnloaded: ->
    @$el.removeClass('is-loading')
    @$el.removeClass('is-active')
    @$el.removeClass('has-results')
    @$results.html ""

  blurSearch: (e) ->
    delay =>
      @$el.removeClass "#{@className}--active"

      $('.path').removeClass('is-hidden')
    , 200

  clearSearch: ->
    @searchUnloaded()
    @$input.val ''

  focusSearch: (e) ->
    @$el.addClass "#{@className}--active"

    $('.path.stuck').addClass('is-hidden')
