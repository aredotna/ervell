Backbone = require 'backbone'
template =-> require('./templates/import_select.jade') arguments...
resultsTemplate =-> require('./templates/import_results.jade') arguments...

module.exports = class ImportSelectChannelView extends Backbone.View
  events:
    'click .import__status__inner__select-channel': 'triggerSearch'
    'click span': 'triggerSearch'
    'keyup .import__status__inner__select__inner__search' : 'onKeyUp'
    'click .search-results__result': 'setSelectedChannel'
    'click .search-results__result--new': 'setNewSelectedChannel'

  initialize: ({ @status, @search }) ->
    @listenTo @status, 'change:selecting', @render

  onKeyUp: (e) ->
    e.preventDefault()
    e.stopPropagation()

    switch e.keyCode
      when 13
        @activateHighlighted e
      when 40
        @moveHighlight('down')
      when 38
        @moveHighlight('up')
      else
        @activateSearch(e)

  moveHighlight: (direction) ->
    $container = @$el

    $items = $container.find('.search-results__result')

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

  clearHighlight: ->
    @$('.is-active').removeClass('is-active')

  reset: ->
    # nothing

  activateSearch: ->
    return @reset() unless query = @getQuery()
    return if (query.length < 2) or (query is @lastQuery)

    @$el.addClass('is-loading')

    @lastQuery = query

    @searchRequest.abort() if @searchRequest
    @searchRequest = @search.fetch
      data:
        q: query
        per: 4
        subject: 'channel'
      success: =>
        @searchLoaded()

  getQuery: ->
    query = @$input.val()?.trim()
    if query.length
      return query
    else
      false

  triggerSearch: ->
    @status.set 'selecting', true

  setSelectedChannel: (e) ->
    id = $(e.currentTarget).data 'id'
    channel = @search.get id
    @model.set channel.attributes
    @status.set 'selecting', false

  setNewSelectedChannel: (e) ->
    @model.set 
      title: @getQuery()
      status: 'private'
      is_new: true
    @status.set 'selecting', false

  searchLoaded: ->
    @$results.html resultsTemplate
      results: @search.models
      query: @getQuery()

    @$results.css
      width: @$input.outerWidth()
  
  render: ->
    @$el.html template
      selectedChannel: @model
      selectingChannel: @status.get('selecting')
    
    @_postRender()

  _postRender: ->
    @$('input').focus()
    @$input = @$('.import__status__inner__select__inner__search')
    @$results = @$('.import__status__inner__select__inner__results')
