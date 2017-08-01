qs = require 'qs'
moment = require 'moment'
{ extend } = require 'underscore'
{ USER, CUSTOMER } = require('sharify').data
paymentMethods = require '../../components/payment_methods/index.coffee'
yourPlan = require '../../components/your_plan/index.coffee'
cancelPlan = require '../../components/cancel_plan/index.coffee'
premiumCTA = require '../../components/premium_cta/index.coffee'
Customer = require '../../../../models/customer.coffee'
User = require '../../../../models/user.coffee'

module.exports = ($el) ->
  return unless $el.length

  models =
    user: user = new User USER
    customer: customer = new Customer CUSTOMER

  # Checks to see if a non-premium user has selected a plan
  { plan_id } = qs.parse(location.search.slice 1)
  if plan_id? and not user.get('is_premium')
    customer.set
      plan_id: plan_id
      current_period_end_at: moment().format()

  paymentMethods $el.find('.js-payment-methods'), models
  yourPlan $el.find('.js-your-plan'), models
  cancelPlan $el.find('.js-cancel-plan'), models
  premiumCTA $el.find('.js-premium-cta'), models
