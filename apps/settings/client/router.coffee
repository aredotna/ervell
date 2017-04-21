Backbone = require 'backbone'

module.exports = class SettingsRouter extends Backbone.Router
  routes:
    'settings/general': 'general'
    'settings/notifications': 'notifications'
    'settings/billing': 'billing'

  general: require('./tabs/general.coffee')
  notifications: require('./tabs/notifications.coffee')
  billing: require('./tabs/billing.coffee')
