Backbone = require 'backbone'
Backbone.$ = $
Dismisser = require '../has_seen/dismisser.coffee'
{ isMobile } = require '../util/device.coffee'
analytics = require '../../lib/analytics.coffee'
template = -> require('./index.jade') arguments...

module.exports = class MessageView extends Backbone.View
  className: 'Message'

  events:
    'click .js-close': 'remove'

  initialize: ({ @persist = true }) ->
    if @persist
      @dismisser = new Dismisser
        key: "#{@className}--#{@model.id}"
        limit: 1

  isRenderable: ->
    not isMobile() and
    not (@persist and @dismisser.dismissed())

  render: ->
    @$el.html template
      message: @model

    this

  remove: ->
    analytics.track.click 'Message closed', id: @model.id

    @dismisser.dismiss() if @persist

    super
