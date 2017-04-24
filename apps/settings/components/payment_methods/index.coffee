PaymentMethodsView = require './view.coffee'

module.exports = ($el, { customer }) ->
  return unless $el.length

  view = new PaymentMethodsView
    el: $el
    model: customer
    collection: customer.related().sources

  view.postRender()
