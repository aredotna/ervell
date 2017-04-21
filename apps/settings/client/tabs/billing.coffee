paymentMethods = require '../../components/payment_methods/index.coffee'
yourPlan = require '../../components/your_plan/index.coffee'
cancelPlan = require '../../components/cancel_plan/index.coffee'

module.exports = ->
  paymentMethods $('.js-payment-methods')
  yourPlan $('.js-your-plan')
  cancelPlan $('.js-cancel-plan')
