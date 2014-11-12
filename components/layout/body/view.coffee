_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
PathView = require '../../path/client/path_view.coffee'
LightboxRouter = require '../../lightbox/lightbox_router.coffee'

module.exports = class BodyView extends Backbone.View

  events:
    'click a[data-disabled]'                      : 'disable'
    'click a[data-client]:not([data-disabled])'   : 'intercept'

  initialize: (options) ->
    current_path = sd.CURRENT_PATH?.replace sd.CLIENT_PATH, ""

    new LightboxRouter
    Backbone.history.start pushState: true, root: current_path

    if sd.CLIENT_PATH
      Backbone.history.navigate sd.CLIENT_PATH, trigger: true, replace: false

    mediator.on 'load:start', @startLoading, @
    mediator.on 'load:stop', @stopLoading, @

    new PathView el: @$('section.path--header')

  startLoading: -> $('body').addClass 'is-loading'

  stopLoading: -> $('body').removeClass 'is-loading'

  intercept: (e)->
    e.preventDefault()

    Backbone.history.navigate "#{$(e.currentTarget).attr('href')}", trigger: true, replace: true

  disable: (e)->
    e.preventDefault()
    e.stopPropagation()