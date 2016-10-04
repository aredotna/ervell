Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
validator = require 'validator'
mediator = require '../../../lib/mediator.coffee'
ConnectView = require '../../../components/connect/client/connect_view.coffee'
ConnectionBlocks = require '../../../collections/connection_blocks.coffee'
SaveConnectResultsView = require './save_connect_results_view.coffee'

template = -> require('../templates/save.jade') arguments...
textDropTemplate = -> require('../templates/text_drop.jade') arguments...
imageDropTemplate = -> require('../templates/image_drop.jade') arguments...

class TabState extends Backbone.Model
  defaults: mode: 'url'

module.exports = class SaveConnectView extends ConnectView

  events:
    'tap .new-connection__done-button' : 'saveOrClose'
    'tap .tab--container__nav__item'   : 'handleTab'
    'keyup .new-connection__search'    : 'onKeyUp'

  initialize: ->
    @tabState = new TabState()

    window.addEventListener 'message', (e) =>
      @trigger(e.data.action, e.data) if e.data isnt 'close'

    @on 'drag', @handleDrag
    @on 'drop', @handleDrop

    @tabState.on 'change', @render, @

    super

  handleDrag: (data) ->
    @switchTab 'drop'

  handleDrop: (data) ->
    $html = $(data.value['text/html'])
    src = $html.find('img').attr('src')
    src = $html.first().next().attr('src')  if not src
    href = $html.first().next().attr('href') if not src

    if href
      @newURL = href
      return @switchTab 'url'

    type = if src then "Block" else "Text"

    if type is "Text"
      @content = data.value['text/plain']
      @renderPreview type: 'text', content: @content
    else
      $value = $(data.value['text/html'])
      imgsrc = $value.find('img').attr('src')
      @content =  src
      @renderPreview type: 'image', src: src

    @sendExpandMsg()

  handleTab: (e) ->
    e.preventDefault()
    e.stopPropagation()

    tab = $(e.currentTarget).data 'tab'
    @switchTab tab

  switchTab: (tab) ->
    @tabState.set mode: tab

  renderPreview: (options) ->
    if options.type is 'text'
      @$("#tab-drop .grid").html textDropTemplate
        text: options.content
    else
      @$("#tab-drop .grid").html imageDropTemplate
        src: options.src

  updateStatus: ->
    if @marked()?.length or @$el.hasClass 'is-saving'
      @$('.grid__block--image, #save-content').addClass 'is-connected'
      @$('.new-connection__done-button').text 'Save and close'
    else
      @$('.grid__block--image, #save-content').removeClass 'is-connected'
      @$('.new-connection__done-button').text 'Close'

  sendExpandMsg: ->
    window.top.postMessage { action: 'expand' }, '*'

  sendContractMsg: ->
    window.top.postMessage { action: 'contract' }, '*'

  sendCloseMsg: ->
    window.top.postMessage { action: 'close' }, '*'

  saveOrClose: (e)->
    if @marked()?.length
      @saveBlock(e)
    else
      @sendCloseMsg(e)

  marked: ->
    @collection.where marked: true

  saveBlock: (e) =>
    e.preventDefault()

    marked = @collection.where marked: true

    @$el.addClass 'is-saving'

    if marked
      data =
        channel_ids: _.map marked, (marked) ->
          marked.get('slug')

      _.map marked, (block) ->
        block.unset('marked')
        mediator.shared.recent_connections.shove block

      attr = if @isURL() then 'source' else 'content'

      data[attr] = @getContent()

      _.extend data, sd.QUERY

      $.ajax
        url: "#{sd.API_URL}/blocks/multi"
        type: 'POST'
        data: data
        success: @successfulSave
        error: @unsuccessfulSave

  successfulSave: =>
    @$el.removeClass('is-saving').addClass 'is-successful'
    @$('button').prop('disabled', true).text 'Block saved.'
    @sendCloseMsg()

  isURL: ->
    validator.isURL @getContent()

  clear: -> # no op

  getContent: ->
    if @tabState.get('mode') is 'url'
      query = $('#save-content').val()?.trim()
      if query.length
        return query
      else
        false
    else
      return @content

  render: =>
    @$el.html template
      content:  @newURL || sd.CONTENT
      isURL: sd.IS_URL
      tab: @tabState
      query: sd.QUERY

    @postRender()

  postRender: ->
    if @tabState.get('mode') is 'url'
      @sendContractMsg()
    else
      @sendExpandMsg()
    @focusSearch()
    @renderChannels()
    @collection.on 'change:marked', @updateStatus, @

  search: (e) ->
    e.preventDefault()

    return @reset() unless query = @getQuery()
    return if (query.length < 2) or (query is @lastQuery)

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
