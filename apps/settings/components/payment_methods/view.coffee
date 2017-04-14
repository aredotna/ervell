Backbone = require 'backbone'
{ extend } = require 'underscore'
{ STRIPE_PUBLISHABLE_KEY } = require('sharify').data
styles = require './lib/styles.coffee'

module.exports = class PaymentMethodsView extends Backbone.View
  events:
    'submit .js-add': 'addPaymentMethod'
    'click .js-default': 'defaultPaymentMethod'
    'click .js-remove': 'removePaymentMethod'

  initialize: ->
    @stripe = Stripe STRIPE_PUBLISHABLE_KEY

  addPaymentMethod: (e) ->
    e.preventDefault()

    form = $(e.currentTarget)

    @els.submit
      .prop 'disabled', true
      .text 'Saving...'

    @stripe.createToken(@card)
      .then ({ token, error }) =>
        return Promise.reject(error) if error

        $.ajax
          method: 'POST'
          url: @collection.url
          data: token: token.id

      .then =>
        location.reload()

        @els.submit
          .text 'Added card'

      , (error) =>
        @els.errors
          .show()
          .text error.message

        @els.submit
          .prop 'disabled', false
          .text 'Error'

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

        setTimeout () =>
          @els.errors
            .empty()
            .hide()
        , 2000

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

        setTimeout () =>
          @els.errors
            .empty()
            .hide()
        , 2000

  postRender: ->
    @els =
      card: @$('.js-card-element')
      errors: @$('.js-form-errors')
      submit: @$('.js-form-submit')

    # Pass Stripe Element our default input style
    valid = ['color', 'font-size', 'font-family']
    placeholder = '::placeholder': color: lightgray = '#9D9D9D'
    style = extend styles(@els.card.find('input'), valid), placeholder
    @els.card.empty()
    @card = @stripe.elements().create 'card', style: base: style

    # Mount Stripe Element
    @card.mount @els.card[0]
    @card.addEventListener 'change', ({ error }) =>
      if error
        @els.errors
          .show()
          .text error.message
      else
        @els.errors
          .empty()
          .hide()

  remove: ->
    throw new Error 'not implemented yet'
