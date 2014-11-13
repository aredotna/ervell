_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'

followButtonTemplate = -> require('../templates/follow_button.jade') arguments...

module.exports = class FollowButtonView extends Backbone.View

  initialize: (options) ->
    super

    console.log 'init FollowButtonView', @$el
    mediator.on 'current_user:prefetched', @render, @

  render: ->
    console.log 'rendered FollowButtonView'
    @$el.html followButtonTemplate(model: @model, user: mediator.shared.current_user)


