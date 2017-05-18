YourPlanView = require './view.coffee'

module.exports = ($el, { customer, user }) ->
  return unless $el.length

  view = new YourPlanView
    el: $el
    model: customer
    user: user

  view.render()
  view
