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
      bitcoin: true
      email: sd.CURRENT_USER.email

  openCheckout: (e) =>
    @handler.open
      name: 'Are.na'
      description: '1 year / Premium subscription'
      amount: 4500

    @$('.premium--status').addClass('is-active')

    e.preventDefault()

  handleToken: (token) =>
    @$('.premium--status .inner').text "Registering your premium account..."
    $.ajax
      url: "#{sd.API_URL}/charges"
      type: 'POST'
      data: stripeToken: token
      success: (response) =>
        @$('.premium--status').addClass('is-successful')
        @$('.premium--status .inner').text "Registration successful."
        # $.ajax
        #   url: '/me/refresh'
        #   type: 'GET'
        #   success: ->
        location.reload()
      error: (response) =>
        @$('.premium--status').addClass('is-error')
        @$('.premium--status .inner').text "Sorry, error registering your account, please try again."
        setTimeout (=> @$('.premium--status').removeClass('is-active')), 2000
