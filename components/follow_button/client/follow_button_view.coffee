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

  render: ->
    @$el.html followButtonTemplate(model: @model, user: mediator.shared.current_user)

  toggleFollow: (e) ->
    console.log 'toggleFollow', e

