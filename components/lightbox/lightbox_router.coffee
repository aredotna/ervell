Backbone = require 'backbone'
_ = require 'underscore'
mediator = require '../../lib/mediator.coffee'

module.exports = class LightboxRouter extends Backbone.Router

  routes:
    'block/:id': 'showBlock'

  showBlock: (id)->
    mediator.trigger 'open:lightbox', id: id