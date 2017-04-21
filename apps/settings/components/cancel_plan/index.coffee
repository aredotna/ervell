CancelPlanView = require './view.coffee'
Customer = require '../../../../models/customer.coffee'
{ CUSTOMER } = require('sharify').data

module.exports = ($el) ->
  customer = new Customer CUSTOMER

  view = new CancelPlanView
    el: $el
    model: customer

  view.render()
  view
