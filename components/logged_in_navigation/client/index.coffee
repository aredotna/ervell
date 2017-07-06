{ each } = require 'underscore'
initChannelCreate = require '../components/channel_create/index.coffee'
initNotifications = require '../components/notifications/index.coffee'
initViewMode = require '../components/view_mode/index.coffee'
initDropdowns = require '../../dropdown/client/index.coffee'

module.exports = ($el) ->
  views =
    channel: initChannelCreate $el.find('.js-channel-create')
    notifications: initNotifications $el.find('.js-notifications')
    view_mode: initViewMode $el.find('.js-view-mode')

  initDropdowns $el

  each views, (view) ->
    return unless view?

    view.on 'persist', ->
      view.$el.addClass hoverClass = 'DropdownHover--hover'

      $('body').one 'click', ->
        view.$el.removeClass hoverClass
