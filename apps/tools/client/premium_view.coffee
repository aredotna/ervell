Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'

module.exports = class PremiumView extends Backbone.View

  events:
    'click .button--add': 'openCheckout'

  initialize: ->
    @handler = StripeCheckout.configure
      key: sd.STRIPE_PUBLISHABLE_KEY
      image: 'https://s3.amazonaws.com/stripe-uploads/acct_14Lg6j411YkgzhRMmerchant-icon-1432502887007-arena-mark.png'
      token: @handleToken

  openCheckout: (e) =>
    @handler.open
      name: 'Are.na'
      description: '1 year / Premium subscription'
      amount: 4500

    e.preventDefault()

  handleToken: (token)->
    $.ajax
      url: "#{sd.API_URL}/charges"
      type: 'POST'
      data: stripeToken: token
      success: (response) ->
        console.log 'successful charge', response
      error: (response) ->
        console.log 'charge error', response