Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
UserBlocks = require '../../../collections/user_blocks.coffee'

connectResultsTemplate = -> require('../templates/connect_results.jade') arguments...

module.exports = class ConnectResultsView extends Backbone.View

  events:
    'tap .new-connection__search-result' : 'makeConnection'

  initialize: (options) ->
    @block = options.block
    @collection.on "sync", @render, @

    super

  makeConnection: (e)=>
    target = $(e.currentTarget)
    id = target.data('id')
    target.addClass 'is-loading'

    url = "#{sd.API_URL}/channels/#{id}/connections"
    data =
      connectable_type: @block.get('class')
      connectable_id: @block.id
      channel_id: id

    @saveConnection(url, data, target)

  saveConnection: (url, data, target)->
    console.log 'saveConnection', url, data, target
    loadReady = false
    loadComplete = false

    maybeEndLoad = ->
      if loadReady && loadComplete
        target.removeClass('is-loading')
        target.addClass('is-connected')

    setTimeout ->
      loadReady = true
      maybeEndLoad()
    , 200

    $.ajax
      type: "POST"
      url: url
      data: data
      complete: ->
        loadComplete = true
        maybeEndLoad()

  render: ->
    @$el.html connectResultsTemplate(blocks: @collection.models)