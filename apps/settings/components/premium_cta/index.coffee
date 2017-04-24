moment = require 'moment'

module.exports = ($el, { customer }) ->
  return unless $el.length

  customer.once 'change:plan_id', ->
    $el.remove()

  $el.find('.js-cta').click (e) ->
    e.preventDefault()

    customer.set
      plan_id: 'premium_1'
      current_period_end_at: moment().format()
