paymentMethods = require '../../components/payment_methods/index.coffee'
yourPlan = require '../../components/your_plan/index.coffee'
cancelPlan = require '../../components/cancel_plan/index.coffee'
premiumCTA = require '../../components/premium_cta/index.coffee'
Customer = require '../../../../models/customer.coffee'
User = require '../../../../models/user.coffee'
{ USER, CUSTOMER } = require('sharify').data

module.exports = ->
  models = user: new User(USER), customer: new Customer(CUSTOMER)

  paymentMethods $('.js-payment-methods'), models
  yourPlan $('.js-your-plan'), models
  cancelPlan $('.js-cancel-plan'), models
  premiumCTA $('.js-premium-cta'), models
