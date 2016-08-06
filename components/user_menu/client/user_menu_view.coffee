_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
DropdownView = require '../../dropdown/client/dropdown_view.coffee'

template = -> require('../templates/index.jade') arguments...

module.exports = class UserMenuView extends DropdownView

  initialize: ->
    mediator.on 'notifications:synced', @maybeSetNotifications, @
    mediator.on 'current_user:refreshed', @render, @

    @notifications = mediator.shared.notifications

    super

  maybeSetNotifications: ->
    if (count = @notifications.getNumberUnread()) > 0
      @$('.user-avatar, .dropdown__link--notifications').addClass 'has-notifications'
      @$('.notifications--count').text count

  unsetNotifications: ->
    @$('.user-avatar, .dropdown__link--notifications').removeClass 'has-notifications'
    @$('.notifications--count').text "0"

  render: ->
    @$el.html template user: mediator.shared.current_user
