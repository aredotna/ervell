Backbone = require 'backbone'
_ = require 'underscore'
mediator = require '../../lib/mediator.coffee'

module.exports = class LightboxRouter extends Backbone.Router

  routes:
    'block/:id': 'showBlock'
    '': 'closeLightbox'

  initialize: ->
    mediator.on 'lightbox:closed', @removeRoute, @

  closeLightbox: -> # nothing for now

  removeRoute: ->
    loc = window.location
    history.pushState "", document.title, loc.pathname + loc.search
    @navigate '', trigger: false, replace: false

  showBlock: (id)->
    mediator.trigger 'open:lightbox', id: id