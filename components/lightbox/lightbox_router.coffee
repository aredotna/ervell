Backbone = require 'backbone'
_ = require 'underscore'
mediator = require '../../lib/mediator.coffee'
Block = require '../../models/block.coffee'
LightboxView = require './client/lightbox_view.coffee'

module.exports = class LightboxRouter extends Backbone.Router

  routes:
    '' : 'hideBlock'
    'block/:id': 'showBlock'

  initialize: ->
    console.log 'LightboxRouter init'
    mediator.on 'lightbox:closed', @removeRoute, @
    mediator.on 'lightbox:opened', @showBlock, @

  hideBlock: -> # nothing for now

  removeRoute: ->
    loc = window.location
    history.pushState "", document.title, loc.pathname + loc.search
    @navigate '', trigger: false, replace: false

  hideBlock: ->
    console.log 'hideBlock'
    if @lbv
      @lbv.remove()

  showBlock: (id)->
    block = new Block {id: id}
    @lbv = new LightboxView
      el: $('#l-lightbox-container')
      model: block