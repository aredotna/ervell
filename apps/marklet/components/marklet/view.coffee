{ invoke, extend } = require 'underscore'
Promise = require 'bluebird-q'
Backbone = require 'backbone'
{ isURL } = require 'validator'
{ API_URL, QUERY } = require('sharify').data
mediator = require '../../../../lib/mediator.coffee'
ConnectView = require '../../../../components/connect/client/view.coffee'
ConnectCollections = require '../../../../components/connect/client/collections.coffee'
template = -> require('./index.jade') arguments...

module.exports = class MarkletView extends Backbone.View
  className: 'Marklet'

  subViews: []

  events:
    'click .js-button': 'saveAndClose'
    'click .js-mode': 'changeMode'

  initialize: ->
    { @search, @recentConnections } = ConnectCollections()

    @state = new Backbone.Model mode: 'url'
    @connectState = new Backbone.Model active: false, query: ''
    @connections = new Backbone.Collection

    $(window).on 'message.Marklet', ({ originalEvent: { data } }) =>
      @trigger data.action, data

    @listenTo this, 'drag', @onDrag
    @listenTo this, 'drop', @onDrop

    @listenTo @model, 'change:content', @render

    @listenTo @state, 'change:mode', @render
    @listenTo @state, 'change:mode', @adjust

    @listenTo mediator, 'connection:added', @select
    @listenTo mediator, 'connection:removed', @unselect
    @listenTo mediator, 'connection:added connection:removed', @render

  expand: ->
    window.top.postMessage { action: 'expand' }, '*'

  contract: ->
    window.top.postMessage { action: 'contract' }, '*'

  close: ->
    window.top.postMessage { action: 'close' }, '*'
    @remove()

  select: (channel) ->
    @connections.add channel

  unselect: (channel) ->
    @connections.remove channel

  changeMode: (e) ->
    e.preventDefault()

    mode = $(e.currentTarget).data('mode')
    @state.set 'mode', mode

  adjust: (_state, mode) ->
    if mode is 'url' then @contract() else @expand()

  onDrag: ->
    @state.set 'mode', 'drop'

  onDrop: (data) ->
    $html = $(data.value['text/html'])
    text = data.value['text/plain']
    src = $html.find('img').attr('src')
    src = $html.first().next().attr('src') unless src
    href = if !src and isURL(text) then text

    # Dropped a link
    if href?
      @model.set 'content', href
      @state.set 'mode', 'url'
      return

    # Dropped an image
    else if src?
      @model.set 'content', src
      @state.set 'mode', 'image'

    # Dropped highlighted text
    else
      @model.set 'content', data.value['text/plain']
      @state.set 'mode', 'text'

  saveAndClose: (e) ->
    e.preventDefault()

    return @close() if @dom.button.data('action') is 'close'

    @dom.button.text 'Saving'

    @save()
      .then =>
        @dom.button.text 'Saved'

      .then =>
        @close()

      .catch =>
        @dom.button.text 'Error'

  save: ->
    val = @dom.input.val()?.trim() or @model.get('content')

    data = channel_ids: @connections.pluck 'slug'
    data[if isURL(val) then 'source' else 'content'] = val
    data = extend {}, data, QUERY

    Promise $.ajax
      type: 'POST'
      url: "#{API_URL}/blocks/multi"
      data: data

  postRender: ->
    subView = new ConnectView
      model: @model
      collection: @recentConnections
      search: @search
      state: @connectState

    @subViews = [subView]

    @dom =
      input: @$('.js-input')
      body: @$('.js-body')
      button: @$('.js-button')

    @dom.body
      .html subView.render().$el

  render: ->
    @$el.html template
      block: @model.toJSON()
      state: @state.toJSON()
      connections: @connections.toJSON()

    @postRender()

    this

  remove: ->
    invoke @subViews, 'remove'

    $(window).off '.Marklet'

    super
