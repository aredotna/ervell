Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
UserBlocks = require '../../../collections/user_blocks.coffee'

connectResultsTemplate = -> require('../templates/connect_results.jade') arguments...

module.exports = class ConnectResultsView extends Backbone.View

  getTemplate: ->
    if @kind is 'block'
      require('../templates/block_connect_results.jade') arguments...
    else
      require('../templates/connect_results.jade') arguments...

  events:
    'click .new-connection__search-result' : 'toggleConnection'
    'click .list-item__connection' : 'toggleConnection'

  initialize: ({ @block, @kind }) ->
    @collection.on "sync add", @render, @

  toggleConnection: (e)=>
    e.preventDefault()
    e.stopPropagation()

    target = $(e.currentTarget)
    id = target.data('id')

    if target.hasClass('is-connected')
      analytics.track.click 'Connection removed'
      mediator.trigger 'connection:removed', @collection.get(id)
      mediator.trigger "connection:removed:#{@block.id}", @collection.get(id)

      reqOpts =
        type: 'DELETE'
        url: "#{sd.API_URL}/channels/#{id}/blocks/#{@block.id}"
    else
      connection = @collection.get(id)
      mediator.shared.recent_connections.shove connection
      mediator.trigger "connection:added:#{@block.id}", connection
      analytics.track.click 'Connection created'
      mediator.trigger 'connection:added', connection
      reqOpts =
        type: "POST"
        url: "#{sd.API_URL}/channels/#{id}/connections"
        data:
          connectable_type: @block.get('class')
          connectable_id: @block.id
          channel_id: id

    @makeConnectionRequest target, reqOpts

  makeConnectionRequest: (target, opts)->
    loadReady = false
    loadComplete = false

    target.addClass 'is-loading'

    maybeEndLoad = ->
      if loadReady && loadComplete
        target.removeClass('is-loading')
        target.toggleClass('is-connected')
        target.delay(5000).toggleClass('disconnect-label')

    setTimeout ->
      loadReady = true
      maybeEndLoad()
    , 800

    opts.complete = ->
      loadComplete = true
      maybeEndLoad()

    $.ajax(opts)

  render: ->
    @$el.html @getTemplate(blocks: @collection.models)
