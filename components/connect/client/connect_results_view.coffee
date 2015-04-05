Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
UserBlocks = require '../../../collections/user_blocks.coffee'

connectResultsTemplate = -> require('../templates/connect_results.jade') arguments...

module.exports = class ConnectResultsView extends Backbone.View

  events:
    'tap .new-connection__search-result' : 'toggleConnection'

  initialize: (options) ->
    require('./analytics.coffee')()

    @block = options.block
    @collection.on "sync add", @render, @
    super

  toggleConnection: (e)=>
    target = $(e.currentTarget)
    id = target.data('id')

    if target.hasClass('is-connected')
      analytics.track.click 'Connection removed'
        label: analytics.modelNameAndIdToLabel @model.get('class'), @model.id

      reqOpts =
        type: 'DELETE'
        url: "#{sd.API_URL}/channels/#{id}/blocks/#{@block.id}"
    else
      mediator.shared.recent_connections.create @collection.get(id).toJSON()
      analytics.track.click 'Connection created'
        label: analytics.modelNameAndIdToLabel @model.get('class'), @model.id
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

    setTimeout ->
      loadReady = true
      maybeEndLoad()
    , 200

    opts.complete = ->
      loadComplete = true
      maybeEndLoad()

    $.ajax(opts)

  render: ->
    @$el.html connectResultsTemplate(blocks: @collection.models)