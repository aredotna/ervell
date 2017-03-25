Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
SearchBlocks = require '../../../collections/search_blocks.coffee'
analytics = require '../../../lib/analytics.coffee'

resultsTemplate = -> require('../templates/results.jade') arguments...

module.exports = class SearchBarView extends Backbone.View

  events:
    'keyup #layout-header__search__input' : 'onKeyUp'
    'click .layout-header__search__close' : 'clearSearch'
    'blur #layout-header__search__input'  : 'blurSearch'
    'focus #layout-header__search__input' : 'focusSearch'
    'click .search__results__see-all'     : 'fullResults'

  initialize: (options)->
    @$input = @$('#layout-header__search__input')
    @$results = @$('.layout-header__search__results')
    @collection = new SearchBlocks()
    @collection.url = "#{sd.API_URL}/search/channels"

  onKeyUp: (e)->
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

  fullResults: (e)->
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

  scrollToHighlight: () ->
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
    _.delay =>
      @$el.removeClass('is-active')
      $('.path').removeClass('is-hidden')
    , 200

  clearSearch: ->
    @searchUnloaded()
    @$input.val ""

  focusSearch: (e)->
    @$el.addClass('is-active')
    $('.path.stuck').addClass('is-hidden')
