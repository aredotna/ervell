general = require './tabs/general.coffee'
notifications = require './tabs/notifications.coffee'
billing = require './tabs/billing.coffee'

module.exports = ->
  general $('.js-general')
  notifications $('.js-notifications')
  billing $('.js-billing')
