general = require './tabs/general.coffee'
billing = require './tabs/billing.coffee'
group_billing = require './tabs/group_billing.coffee'

module.exports = ->
  general $('.js-general')
  billing $('.js-billing-component')
  group_billing $('.js-group-billing-component')
