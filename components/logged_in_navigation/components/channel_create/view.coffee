Promise = require 'bluebird-q'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class ChannelCreateView extends Backbone.View
  events:
    'mouseover': 'focus'
    'input .js-title': 'title'
    'click .js-status': 'status'
    'click .js-create': 'create'

  initialize: ({ @user }) ->
    @listenTo @model, 'change', @render

  focus: ->
    @dom.title.focus()

  title: ->
    @model.set 'title', @dom.title.val(), silent: true

  status: (e) ->
    e.preventDefault()

    status = $(e.currentTarget).data 'value'
    @model.set 'status', status

  create: (e) ->
    e.preventDefault()

    return unless @model.has('title')

    @dom.create.text 'Creating...'

    Promise(@model.save())
      .then =>
        @dom.create.text 'Redirecting...'
        window.location.href = "/#{@model.get('user').slug}/#{@model.get('slug')}"

      .catch =>
        @dom.create.text 'Error'

  render: ->
    @$el.html template
      user: @user
      channel: @model

    @dom =
      title: @$('.js-title')
      create: @$('.js-create')

    @focus()

    this
