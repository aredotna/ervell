_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'

followButtonTemplate = -> require('../templates/follow_button.jade') arguments...

module.exports = class FollowButtonView extends Backbone.View

  events:
    'click' : 'toggleFollow'

  initialize: (options) ->
    @showTitle = if options.showTitle? then options.showTitle else true

    mediator.on 'current_user:prefetched', @render, @
    mediator.on 'current_user:fetched', @render, @
    mediator.shared.current_user.on 'change:following_channels', @render, @
    mediator.shared.current_user.on 'change:following_users', @render, @

    @render()

  render: ->
    @$el.html followButtonTemplate model: @model, user: mediator.shared.current_user, showTitle: @showTitle

  toggleFollow: (e) ->
    e.preventDefault()
    e.stopImmediatePropagation()

    mediator.shared.current_user.toggleFollow @model

