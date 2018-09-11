initNotifications = require '../components/notifications/index.coffee'
{ default: initNewChannel } = require('../components/channel_create/index.js')
{ default: initUserDropdown } = require('../components/user_dropdown/index.js')

module.exports = ($el) ->
  initNewChannel($el.find('.js-new-channel')[0])
  initUserDropdown($el.find('.js-user-dropdown')[0])
  initNotifications($el.find('.js-notifications'))
