{ each } = require 'underscore'
initNotifications = require '../components/notifications/index.coffee'
initViewMode = require '../components/view_mode/index.coffee'
initDropdowns = require '../../dropdown/client/index.coffee'
{ default: initNewChannel } = require('../components/channel_create/index.js')
{ default: initUserDropdown } = require('../components/you/index.js')

module.exports = ($el) ->
  initNewChannel($el.find('.js-new-channel')[0])
  initUserDropdown($el.find('.js-user-dropdown')[0])

  views =
    notifications: initNotifications $el.find('.js-notifications')
    view_mode: initViewMode $el.find('.js-view-mode')

  initDropdowns $el

  each views, (view) ->
    return unless view?

    view.on 'persist', ->
      view.$el.addClass hoverClass = 'DropdownHover--hover'

      $('body').one 'click', ->
        view.$el.removeClass hoverClass
