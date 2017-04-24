paymentMethods = require '../../components/payment_methods/index.coffee'
yourPlan = require '../../components/your_plan/index.coffee'
cancelPlan = require '../../components/cancel_plan/index.coffee'
premiumCTA = require '../../components/premium_cta/index.coffee'
Customer = require '../../../../models/customer.coffee'
User = require '../../../../models/user.coffee'
{ USER, CUSTOMER } = require('sharify').data

module.exports = ($el) ->
  models = user: new User(USER), customer: new Customer(CUSTOMER)

  paymentMethods $el.find('.js-payment-methods'), models
  yourPlan $el.find('.js-your-plan'), models
  cancelPlan $el.find('.js-cancel-plan'), models
  premiumCTA $el.find('.js-premium-cta'), models
