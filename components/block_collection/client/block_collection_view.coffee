Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
Block = require '../../../models/block.coffee'
LightboxRouter = require '../../lightbox/lightbox_router.coffee'
LightboxView = require '../../lightbox/client/lightbox_view.coffee'
ConnectView = require '../../connect/client/connect_view.coffee'

module.exports = class BlockCollectionView extends Backbone.View

  events:
    'click .grid__block__connect-btn' : 'renderConnectView'

  initialize: (options)->
    mediator.on 'open:lightbox', @openLightbox, @

    new LightboxRouter
    Backbone.history.start()

    @channel = options.channel
    @blocks = options.blocks

    @render()
    super

  renderConnectView: (event) ->
    event.preventDefault()
    event.stopPropagation()

    $connect_container = $(event.currentTarget).parent().next()

    $connect_container.addClass 'is-active'
    new ConnectView
      el: $connect_container
      channel: @channel

  openLightbox: (id)->
    console.log 'openLightbox', id
    block = new Block id
    @lbv = new LightboxView
      el: $('#l-lightbox-container')
      model: block

  render: => console.log 'rendering block view', @