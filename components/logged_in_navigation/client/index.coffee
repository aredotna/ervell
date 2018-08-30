{ each } = require 'underscore'
initNotifications = require '../components/notifications/index.coffee'
initViewMode = require '../components/view_mode/index.coffee'
initYou = require '../components/you/index.coffee'
initDropdowns = require '../../dropdown/client/index.coffee'
{ default: initNewChannel } = require('../components/channel_create/index.js')

module.exports = ($el) ->
  views =
    notifications: initNotifications $el.find('.js-notifications')
    view_mode: initViewMode $el.find('.js-view-mode')
    you: initYou $el.find('.js-you')

  initDropdowns $el

  each views, (view) ->
    return unless view?

    view.on 'persist', ->
      view.$el.addClass hoverClass = 'DropdownHover--hover'

      $('body').one 'click', ->
        view.$el.removeClass hoverClass

  initNewChannel($el.find('.js-new-channel')[0])
