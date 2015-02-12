Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
UserBlocks = require '../../../collections/user_blocks.coffee'

connectResultsTemplate = -> require('../templates/connect_results.jade') arguments...

module.exports = class ConnectResultsView extends Backbone.View

  events:
    'tap .new-connection__search-result' : 'toggleConnection'

  initialize: (options) ->
    @block = options.block
    @collection.on "sync", @render, @
    super

  toggleConnection: (e)=>
    target = $(e.currentTarget)
    id = target.data('id')

    if target.hasClass('is-connected')
      reqOpts =
        type: 'DELETE'
        url: "#{sd.API_URL}/channels/#{id}/blocks/#{@block.id}"
    else
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