Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
validator = require 'validator'
mediator = require '../../../lib/mediator.coffee'
ConnectView = require '../../../components/connect/client/connect_view.coffee'
ConnectionBlocks = require '../../../collections/connection_blocks.coffee'
SaveConnectResultsView = require './save_connect_results_view.coffee'

connectTemplate = -> require('../templates/connect.jade') arguments...

module.exports = class SaveConnectView extends ConnectView

  events:
    'tap .new-connection__done-button' : 'saveOrClose'
    'keyup .new-connection__search'    : 'onKeyUp'

  updateButtonCopy: ->
    if @marked()?.length
      @$('.new-connection__done-button').text 'Save and close'
    else
      @$('.new-connection__done-button').text 'Close'

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
    query = $('#save-content').val()?.trim()
    if query.length
      return query
    else
      false

  render: =>
    @$el.html connectTemplate()

    @postRender()

  postRender: ->
    @focusSearch()
    @renderChannels()
    @collection.on 'change:marked', @updateButtonCopy, @

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
