_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'

shareTemplate = -> require('../templates/share_link.jade') arguments...

module.exports = class ShareLinkView extends Backbone.View

  events:
    'click .channel--share-generate' : 'generateShareLink'
    'click .channel--share-unshare'  : 'removeShareLink'

  initialize: ->
    @model.on 'change:share_link', @render, @

  generateShareLink: ->
    @model.generateShareLink()

  removeShareLink: ->
    @model.removeShareLink()

  render: ->
    @$el.html shareTemplate channel: @model



