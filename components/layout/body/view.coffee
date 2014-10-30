_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
LightboxRouter = require '../../lightbox/lightbox_router.coffee'

module.exports = class BodyView extends Backbone.View

  events:
    'click a[data-disabled]'                      : 'disable'
    'click a[data-client]:not([data-disabled])'   : 'intercept'

  initialize: (options) ->
    mediator.on 'open:auth', @openAuth, @

    new LightboxRouter
    Backbone.history.start pushState: true

  intercept: (e)->
    e.preventDefault()

    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true, replace: true

  disable: (e)->
    console.log 'should disable'
    e.preventDefault()
    e.stopPropagation()