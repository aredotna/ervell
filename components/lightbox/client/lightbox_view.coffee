Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'

lightboxTemplate = -> require('../templates/lightbox.jade') arguments...

module.exports = class LightboxView extends Backbone.View

  events:
    'click .lightbox--close': 'close'

  initialize: ->
    $('body').addClass 'is-lightbox'
    @$el.addClass 'is-active'

    @model.on "sync", @render, @
    @model.fetch()

  render: ->
    @$el.html lightboxTemplate(block: @model)

  close: ->
    @$el.html ""
    $('body').removeClass 'is-lightbox'
    @$el.removeClass 'is-active'