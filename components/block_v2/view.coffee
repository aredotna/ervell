Backbone = require 'backbone'
Block = require '../../models/block.coffee'
ConnectView = require '../connect/client/connect_view.coffee'
analytics = require '../../lib/analytics.coffee'
mediator = require '../../lib/mediator.coffee'
BlockCollectionConnectIntegrationView = require '../connect_v2/integration/block_collection/view.coffee'

module.exports = class BlockView extends Backbone.View

  events: 
    'click .js-source' : 'openSource'
    'click .js-connect' : 'openConnect'

  initialize: ({ @block }) ->
    # nothing

  openSource: (e) ->
    analytics.track.click "Block source opened"

    url = @block.kind.source_url or @block.kind.file_url

    e.preventDefault()
    e.stopImmediatePropagation()

    analytics.trackOutboundLink url

    window.open url,'_blank'

    false

  openConnect: (e) ->
    e.preventDefault()
    e.stopPropagation()

    @$el.addClass 'Block--is_connecting'

    # temp: get a real block
    block = new Block id: @block.id

    block.fetch 
      success: =>
        view = new BlockCollectionConnectIntegrationView model: block

        view.once 'remove', =>
          @$el.removeClass 'Block--is_connecting'

        $target
          .addClass 'is-active'
          .html view.render().$el