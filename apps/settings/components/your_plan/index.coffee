YourPlanView = require './view.coffee'
Customer = require '../../../../models/customer.coffee'
User = require '../../../../models/user.coffee'
{ USER, CUSTOMER } = require('sharify').data

module.exports = ($el) ->
  customer = new Customer CUSTOMER
  user = new User USER

  view = new YourPlanView
    el: $el
    model: customer
    user: user

  view.render()
  view
