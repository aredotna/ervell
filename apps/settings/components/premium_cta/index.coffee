moment = require 'moment'

module.exports = ($el, { customer }) ->
  return unless $el.length

  $el
    .find '.js-cta'
    .click (e) ->
      e.preventDefault()

      customer.set
        plan_id: 'premium_1'
        current_period_end_at: moment().format()

      code = $(this).data 'coupon'
      customer.related().coupon.set code: code
