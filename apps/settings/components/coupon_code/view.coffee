Backbone = require 'backbone'
Promise = require 'bluebird-q'
{ debounce } = require 'underscore'
template = -> require('./index.jade') arguments...

module.exports = class CouponCodeView extends Backbone.View
  els: {}

  events:
    'input input': 'onInput'

  initialize: ->
    @listenTo @model, 'change:description', @render
    @listenTo @model, 'change:code', @render
    @listenTo @model, 'change:code', debounce(@checkCode, 500)

  onInput: ->
    code = @els.input.val()

    @model.set id: code, code: code

  checkCode: (_model, code) ->
    return unless code?
    return if code is ''

    @model.set id: code, code: code

    Promise(@model.fetch())
      .catch ({ responseJSON: { description }}) =>
        @model.set
          is_valid: false
          description: description

  postRender: ->
    @els = input: @$('.js-input')

    @els.input.focus()
    @els.input.val @els.input.val()

  render: ->
    @$el.html template
      coupon: @model.toJSON()

    @postRender()

    this
