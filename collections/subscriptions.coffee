{ API_URL } = require('sharify').data
Collection = require './base.coffee'

module.exports = class Subscriptions extends Collection
  url: "#{API_URL}/account/customer/subscriptions"
