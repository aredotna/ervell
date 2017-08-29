Backbone = require 'backbone'
Backbone.$ = $ # TODO: remove?
mediator = require '../../../lib/mediator.coffee'
template = -> require('../templates/follow_button.jade') arguments...

module.exports = class FollowButtonView extends Backbone.View
  className: 'FollowButton'

  events:
    'click': 'toggleFollow'

  initialize: ({ showTitle }) ->
    @user = mediator.shared.current_user
    @showTitle = if showTitle? then showTitle else true

    @listenTo @user, 'change:following_channels', @render
    @listenTo @user, 'change:following_users', @render

    @render() # TODO: remove

  toggleFollow: (e) ->
    e.preventDefault()
    e.stopImmediatePropagation()

    @user.toggleFollow @model

  render: ->
    @$el
      .attr 'data-following', @user.isFollowing(@model)
      .html template
        model: @model
        user: @user
        showTitle: @showTitle

    this
