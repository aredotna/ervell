CancelPlanView = require './view.coffee'

module.exports = ($el, { customer }) ->
  view = new CancelPlanView
    el: $el
    model: customer

  view.render()
  view
