sd = require("sharify").data
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'

class PricingView extends Backbone.View
  price: 4500

  events:
    'click .premium-tiers__tier--basic .premium-tiers__tier__price' : 'openSignup'
    'click .premium-tiers__tier--premium .premium-tiers__tier__price.selectable' : 'openPremium'
    'click .premium-tiers__tier--enterprise .premium-tiers__tier__price' : 'openContact'

  initialize: ->
    if sd.CURRENT_USER
      @handler = StripeCheckout.configure
        key: sd.STRIPE_PUBLISHABLE_KEY
        image: 'https://s3.amazonaws.com/stripe-uploads/acct_14Lg6j411YkgzhRMmerchant-icon-1432502887007-arena-mark.png'
        token: @handleToken
        email: sd.CURRENT_USER.email

  openSignup: ->
    window.location.href = "#{sd.APP_URL}/sign_up"

  openContact: ->
    window.location.href = "mailto:info@are.na"

  openPremium: (e) ->
    if sd.CURRENT_USER
      @handler.open
        name: 'Are.na'
        description: '1 year / Premium subscription'
        amount: @price
      @$('.premium--status').addClass('is-active')
    else
      window.location.href = "#{sd.APP_URL}/log_in?redirect-to=/pricing"

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

module.exports.init = ->
  new PricingView
    el: $('body')