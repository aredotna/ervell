general = require './tabs/general.coffee'
notifications = require './tabs/notifications.coffee'
billing = require './tabs/billing.coffee'
group_billing = require './tabs/group_billing.coffee'

module.exports = ->
  general $('.js-general')
  notifications $('.js-notifications')
  billing $('.js-billing-component')
  group_billing $('.js-group-billing-component')
