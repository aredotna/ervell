Backbone = require 'backbone'
_ = require 'underscore'
mediator = require '../../lib/mediator.coffee'
Block = require '../../models/block.coffee'
Comments = require '../../collections/comments.coffee'
modalize = require '../modalize/index.coffee'
LightboxView = require './client/lightbox_view.coffee'
{ FullBlockView } = require '../../apps/block/client/index.coffee'

module.exports = class LightboxRouter extends Backbone.Router

  routes:
    '' : 'hideBlock'
    'block/:id': 'showBlock'

  initialize: ->
    mediator.on 'lightbox:closed', @removeRoute, @
    mediator.on 'lightbox:opened', @showBlock, @

  showBlock: (id)->
    block = new Block {id: id}
    view = new FullBlockView model: block

    modal = modalize view,
      className: 'modalize things-modal'

    modal.load (done) ->
      block.fetch().then done

    modal.view.on 'closed', =>
      @removeRoute()

  removeRoute: ->
    loc = window.location
    history.pushState "", document.title, loc.pathname + loc.search
    @navigate '', trigger: false, replace: false
