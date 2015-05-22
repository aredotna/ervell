_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'

shareTemplate = -> require('../templates/share_link.jade') arguments...

module.exports = class ShareLinkView extends Backbone.View

  events:
    'click .channel--share-generate' : 'generateShareLink'
    'click .channel--share-unshare'  : 'removeShareLink'
    'click #channel--share-input'    : 'selectAll'

  initialize: ->
    @model.on 'change:share_link', @render, @

  generateShareLink: ->
    analytics.track.click "Share link generated"
    @model.generateShareLink()

  removeShareLink: ->
    analytics.track.click "Share link removed"
    @model.removeShareLink()

  selectAll: (e)->
    $(e.currentTarget).select()

  render: ->
    @$el.html shareTemplate channel: @model


