moment = require 'moment'

module.exports = ($el, { customer }) ->
  return unless $el.length

  $el
    .find '.js-cta'
    .click (e) ->
      e.preventDefault()

      { coupon, plan } = $(this).data()

      customer.set
        plan_id: plan
        current_period_end_at: moment().format()

      customer.related().coupon.set code: coupon
