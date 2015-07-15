Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'

module.exports = class PremiumView extends Backbone.View
  price: 4500

  events:
    'click .button--add': 'openCheckout'

  initialize: ->
    @price = 2250 if sd.COUPON

    if sd.CURRENT_USER
      @handler = StripeCheckout.configure
        key: sd.STRIPE_PUBLISHABLE_KEY
        image: 'https://s3.amazonaws.com/stripe-uploads/acct_14Lg6j411YkgzhRMmerchant-icon-1432502887007-arena-mark.png'
        token: @handleToken
        bitcoin: true
        email: sd.CURRENT_USER.email

  openCheckout: (e) =>
    if sd.CURRENT_USER
      @handler.open
        name: 'Are.na'
        description: '1 year / Premium subscription'
        amount: @price
      @$('.premium--status').addClass('is-active')
    else
      mediator.trigger 'open:auth', mode: 'login'

    e.preventDefault()

  handleToken: (token) =>
    @$('.premium--status .inner').text "Registering your premium account..."
    $.ajax
      url: "#{sd.API_URL}/charges"
      type: 'POST'
      data:
        stripeToken: token
        coupon: sd.COUPON
      success: (response) =>
        @$('.premium--status').addClass('is-successful')
        @$('.premium--status .inner').text "Registration successful."
        analytics.track.submit 'User paid for pro account'
        $.ajax
          url: '/me/refresh'
          type: 'GET'
          beforeSend: (xhr)->
            xhr.setRequestHeader 'X-AUTH-TOKEN', sd.CURRENT_USER?.authentication_token
          success: ->
            location.reload()
      error: (response) =>
        analytics.exception "Error registering pro account: #{response}"
        @$('.premium--status').addClass('is-error')
        @$('.premium--status .inner').text "Sorry, error registering your account, please try again."
        setTimeout (=> @$('.premium--status').removeClass('is-active')), 2000
