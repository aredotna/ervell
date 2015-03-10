_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
ZeroClipboard = require 'zeroclipboard'

shareTemplate = -> require('../templates/share_link.jade') arguments...

module.exports = class ShareLinkView extends Backbone.View

  events:
    'click .channel--share-generate' : 'generateShareLink'
    'click .channel--share-unshare'  : 'removeShareLink'

  initialize: ->
    @setupZeroClipboard()
    @model.on 'change:share_link', @render, @

  generateShareLink: ->
    @model.generateShareLink()

  removeShareLink: ->
    @model.removeShareLink()

  render: ->
    @$el.html shareTemplate channel: @model

  setupZeroClipboard: ->
    ZeroClipboard.config swfPath: "../swf/ZeroClipboard.swf"
    @clip = new ZeroClipboard @$(".channel--share-copy-link")
    @clip.on 'complete', ( client, args ) ->
      console.log 'link copied'

