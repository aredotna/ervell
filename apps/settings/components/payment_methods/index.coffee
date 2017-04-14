PaymentMethodsView = require './view.coffee'
Customer = require '../../../../models/customer.coffee'
{ CUSTOMER } = require('sharify').data

module.exports = ($el) ->
  return unless $el.length

  customer = new Customer CUSTOMER

  view = new PaymentMethodsView
    el: $el
    model: customer
    collection: customer.related().sources

  view.postRender()
