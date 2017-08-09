moment = require 'moment'
{ invoke } = require 'underscore'
Backbone = require 'backbone'
{ CUSTOMER } = require('sharify').data
PaymentMethodsView = require '../payment_methods/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class YourPlanView extends Backbone.View
  className: 'your-plan'

  subViews: []

  events:
    'change select': 'selectPlan'

  initialize: ({ @user }) ->
    @listenTo @model, 'change:plan_id', @render
    @listenTo @model, 'change:plan_id', @updateQueryString

  updateQueryString: (_model, plan_id) ->
    return unless plan_id?
    base = [location.protocol, '//', location.host, location.pathname].join ''
    window.history.pushState null, null, "#{base}?plan_id=#{plan_id}"

  selectPlan: (e) ->
    e.preventDefault()

    plan_id = $(e.currentTarget).val()

    # Switching *to* free plan
    if plan_id is 'free'
      @model.unset 'plan_id'

    # Switching *from* free plan
    else if !CUSTOMER.plan_id?
      @model.set
        plan_id: plan_id
        current_period_end_at: moment().format()

    else
      @model.set
        plan_id: plan_id

  render: ->
    @$el.html template
      user: @user
      customer: @model

    @postRender()

    this

  postRender: ->
    @els =
      errors: @$('.js-form-errors')

    invoke @subViews, 'remove'

    if @model.has('plan_id') and @$('.js-payment-methods').length
      paymentMethodsView = new PaymentMethodsView
        el: @$('.js-payment-methods')
        model: @model
        collection: @model.related().sources

      paymentMethodsView.render()

      @subViews = [
        paymentMethodsView
      ]

  remove: ->
    invoke @subViews, 'remove'
    super
