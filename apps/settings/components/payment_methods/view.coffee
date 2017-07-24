Promise = require 'bluebird-q'
Backbone = require 'backbone'
{ extend } = require 'underscore'
{ STRIPE_PUBLISHABLE_KEY } = require('sharify').data
{ track, en } = require '../../../../lib/analytics.coffee'
styles = require './lib/styles.coffee'
template = -> require('./index.jade') arguments...

module.exports = class PaymentMethodsView extends Backbone.View
  className: 'payment-methods'

  events:
    'click .js-add': 'addPaymentMethod'
    'click .js-default': 'defaultPaymentMethod'
    'click .js-remove': 'removePaymentMethod'
    'click .js-charge': 'createCharge'
    'click .js-reenable': 'reenablePremium'
    'click .js-submit': 'clearErrors'

  initialize: ->
    @stripe = Stripe STRIPE_PUBLISHABLE_KEY

  tokenizeCard: (card) ->
    @stripe.createToken(card)
      .then ({ token, error }) =>
        return Promise.reject(error) if error
        token

  clearErrors: ->
    @els.errors.empty().hide()

  getToken: (card) ->
    if @complete or (not @model.has('default_source'))
      @stripe.createToken(card)
        .then ({ token, error }) =>
          return Promise.reject(error) if error
          token
    else
      Promise.resolve(id: @model.get('default_source'))

  addPaymentMethod: (e) ->
    e.preventDefault()

    label = ($target = $(e.currentTarget)).text()

    $target
      .prop 'disabled', true
      .text 'Saving...'

    @tokenizeCard(@card)
      .then (token) =>
        Promise $.ajax
          method: 'POST'
          url: @collection.url
          data: token: token.id

      .then =>
        location.reload()

        $target.text 'Added card'

      .catch (error) =>
        $target
          .prop 'disabled', false
          .text label

        @els.errors
          .show()
          .text error.message

  defaultPaymentMethod: (e) ->
    e.preventDefault()

    label = ($target = $(e.currentTarget)).text()

    $target.text 'Saving'

    @model.save(default_source: $target.data('id'))
      .then =>
        location.reload()

        $target.text 'Saved!'

      , (error) =>
        $target.text label

        @els.errors
          .show()
          .text error.message

  removePaymentMethod: (e) ->
    e.preventDefault()

    label = ($target = $(e.currentTarget)).text()

    $target.text 'Removing'

    source = @collection.get $target.data('id')
    source.destroy()
      .then =>
        location.reload()

        $target.text 'Removed!'

      , (error) =>
        $target.text label

        @els.errors
          .show()
          .text error.message

  createCharge: (e) ->
    e.preventDefault()

    label = ($target = $(e.currentTarget)).text()

    $target
      .prop 'disabled', true
      .text 'Subscribing'

    @getToken(@card)
      .then (token) =>
        subscription = @model.related().subscriptions.add
          token: token.id
          plan_id: @model.get('plan_id')

        subscription.save()

      .then =>
        Promise($.get('/me/refresh'))

      .then =>
        location.reload()

        $target.text 'Thank you!'

        track.submit en.PREMIUM_PAID,
          label: 'Plan type'
          value: @model.get('plan_id')

      .catch ({ responseJSON: { message, description }}) =>
        $target
          .prop 'disabled', false
          .text message

        @els.errors
          .show()
          .text description

    track.click en.PREMIUM_CHARGE_INITIATED,
      label: 'Plan type'
      value: @model.get('plan_id')

  reenablePremium: (e) ->
    e.preventDefault()

    label = ($target = $(e.currentTarget)).text()

    $target
      .prop 'disabled', true
      .text 'Resubscribing'

    @getToken(@card)
      .then (token) =>
        Promise $.ajax
          method: 'POST'
          url: "#{@model.related().subscriptions.url}/reenable"
          data:
            token: token.id
            plan_id: @model.get('plan_id')

      .then =>
        location.reload()

        $target.text 'Thank you!'

      .catch ({ responseJSON: { message, description }}) =>
        $target
          .prop 'disabled', false
          .text message

        @els.errors
          .show()
          .text description

  postRender: ->
    @els =
      card: @$('.js-card-element')
      errors: @$('.js-form-errors')

    # Pass Stripe Element our default input style
    valid = ['color', 'font-size', 'font-family']
    placeholder = '::placeholder': color: lightgray = '#9D9D9D'
    style = extend styles(@els.card.find('input'), valid), placeholder
    @els.card.empty()
    @card = @stripe.elements().create 'card', style: base: style

    # Mount Stripe Element
    @card.mount @els.card[0]

    @card.on 'change', ({ complete, error }) =>
      @complete = complete

      if error
        @els.errors
          .show()
          .text error.message
      else
        @els.errors.empty().hide()

  render: ->
    @$el.html template
      customer: @model

    @postRender()

    this

  remove: ->
    @card.unmount()
    super
