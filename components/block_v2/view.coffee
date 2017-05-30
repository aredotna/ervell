Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Channel = require '../../models/channel.coffee'
Block = require '../../models/block.coffee'
ConnectView = require '../connect/client/connect_view.coffee'
analytics = require '../../lib/analytics.coffee'
mediator = require '../../lib/mediator.coffee'
FollowButtonView = require '../follow_button/client/follow_button_view.coffee'
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

  getModel: ->
    model = new Block id: @block.id
    
    if @block.kind.__typename is 'Channel'
      model.url = "#{API_URL}/channels/#{@block.id}/thumb"
    else
      model.url = "#{API_URL}/blocks/#{@block.id}"
    
    model

  openConnect: (e) ->
    e.preventDefault()
    e.stopImmediatePropagation()

    $target = @$('.js-connect-container')

    # temp: get a real block
    block = @getModel()

    block.fetch 
      success: =>
        @$el.addClass 'Block--connecting'

        view = new BlockCollectionConnectIntegrationView model: block

        view.once 'remove', =>
          @$el.removeClass 'Block--connecting'

        $target
          .addClass 'is-active'
          .html view.render().$el
  
  renderFollowButton: ->
    model = @getModel()
    model.fetch
      success: =>
        new FollowButtonView
          el: @$('.js-follow')
          model: model
          showTitle: false