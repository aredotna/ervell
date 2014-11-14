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
    super

    mediator.on 'current_user:prefetched', @render, @
    mediator.on 'current_user:fetched', @render, @
    mediator.on 'current_user:followed', @render, @
    mediator.on 'current_user:unfollowed', @render, @

  render: ->
    @$el.html followButtonTemplate(model: @model, user: mediator.shared.current_user)

  toggleFollow: (e) ->
    mediator.shared.current_user.toggleFollow @model

