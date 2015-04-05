_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
ZeroClipboard = require 'zeroclipboard'
analytics = require '../../../lib/analytics.coffee'

shareTemplate = -> require('../templates/share_link.jade') arguments...

module.exports = class ShareLinkView extends Backbone.View

  events:
    'click .channel--share-generate' : 'generateShareLink'
    'click .channel--share-unshare'  : 'removeShareLink'

  initialize: ->
    @setupZeroClipboard()
    @model.on 'change:share_link', @render, @

  generateShareLink: ->
    analytics.track.click "Share link generated"
    @model.generateShareLink()

  removeShareLink: ->
    analytics.track.click "Share link removed"
    @model.removeShareLink()

  render: ->
    @setupZeroClipboard()
    @$el.html shareTemplate channel: @model

  setupZeroClipboard: ->
    ZeroClipboard.config swfPath: "../swf/ZeroClipboard.swf"
    @clip = new ZeroClipboard @$(".channel--share-copy-link")
    @clip.on 'ready', ( client, args ) =>
      @clip.on 'copy', ( client, args ) =>
        @$('.channel--share-success').addClass 'is-active'
        @$('.channel--share-copy-link').hide()

