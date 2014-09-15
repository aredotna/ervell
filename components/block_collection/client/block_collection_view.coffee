Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
Block = require '../../../models/block.coffee'
LightboxRouter = require '../../lightbox/lightbox_router.coffee'
LightboxView = require '../../lightbox/client/lightbox_view.coffee'

module.exports = class BlockCollectionView extends Backbone.View

  initialize: ->
    mediator.on 'open:lightbox', @openLightbox, @

    new LightboxRouter
    Backbone.history.start()

  openLightbox: (id)->
    block = new Block id
    @lbv = new LightboxView
      el: $('#modal-container')
      model: block

  render: => # nothing for now