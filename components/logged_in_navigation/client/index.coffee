initChannelCreate = require '../components/channel_create/index.coffee'
initNotifications = require '../components/notifications/index.coffee'
initViewMode = require '../components/view_mode/index.coffee'

module.exports = ($el) ->
  initChannelCreate $el.find('.js-channel-create')
  initNotifications $el.find('.js-notifications')
  initViewMode $el.find('.js-view-mode')
