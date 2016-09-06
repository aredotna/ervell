{ extend } = require 'underscore'
Backbone = require 'backbone'
DropdownView = require '../../dropdown/client/dropdown_view.coffee'
mediator = require '../../../lib/mediator.coffee'

template = -> require('../templates/_dropdown_content.jade') arguments...

module.exports = class NotificationsView extends DropdownView

  events:
    'tap .js-dropdown-trigger' : 'openNotifications'

  initialize: ->
    @desktopEvents = extend @desktopEvents, @events

    super

    mediator.on 'notifications:synced', @maybeSetNotifications, @
    mediator.on 'notifications:synced', @renderFeed, @
    mediator.on 'notifications:cleared', @unsetNotifications, @

    @notifications = mediator.shared.notifications

  clearNotifications: (e)->
    @notifications.markRead()
    @unsetNotifications()

  openDropdown: ->
    super
    @clearNotifications()

  openNotifications: ->
    window.location.href = "#{sd.APP_URL}/notifications"

  toggleDropdown: ->
    super
    @clearNotifications()

  maybeSetNotifications: ->
    if (count = @notifications.getNumberUnread()) > 0
      @$('.notifications-menu__count').addClass 'notifications-menu__count--has-notifications'
      @$('.notifications-menu__count').text count

  unsetNotifications: ->
    @$('.notifications-menu__count').removeClass 'notifications-menu__count--has-notifications'
    @$('.notifications-menu__count').text "0"

  renderFeed: ->
    @$('.dropdown__inner').html template
      feed: @notifications.models