_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
LightboxRouter = require '../../lightbox/lightbox_router.coffee'

module.exports = class BodyView extends Backbone.View

  events:
    'click a[data-client]' : 'intercept'

  initialize: (options) ->
    mediator.on 'open:auth', @openAuth, @

    new LightboxRouter
    Backbone.history.start pushState: true

  intercept: (e)->
    console.log('intercepting client link')
    e.preventDefault()

    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true, replace: true
