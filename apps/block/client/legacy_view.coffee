Promise = require 'bluebird-q'
_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
markdown = require '../../../lib/markdown.coffee'
Cookies = require 'cookies-js'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Blocks = require '../../../collections/blocks.coffee'
IconicJS = -> require '../../../components/iconic/client/iconic.min.js'
initComments = require '../../../components/comments/index.coffee'
EditableAttributeView = require '../../../components/editable_attribute/client/editable_attribute_view.coffee'

template = -> require('../templates/block.jade') arguments...
connectionsTemplate = -> require('../templates/connections.jade') arguments...
urlConnectionsTemplate = -> require('../templates/url_connections.jade') arguments...

module.exports = class LegacyBlockView extends Backbone.View
  cookieKey: 'sidebar-hidden'
  postRendered: false
  subViews: []

  events:
    'click .block-mobile-arrow': 'scrollDown'
    'click .block-arrow': 'clickSlide'
    'click .js-toggle-info': 'toggleSidebar'
    'flick': 'handleFlick'

  editableAttributes:
    title: 'plaintext'
    description: 'markdown'
    content: 'markdown'

  initialize: (options)->
    @state = new Backbone.Model tab: options.tab or 'connections'
    @user = CurrentUser.orNull()

    @listenTo mediator, 'lightbox:slide:next', => @slide 'next'
    @listenTo mediator, 'lightbox:slide:prev', => @slide 'prev'

    @initModel()

  initModel: ->
    @listenTo @model,  'sync', @renderConnections

    @connections = new Blocks @model?.connections()

    @setupUrlConnections()

    @listenTo mediator, "connection:added:#{@model.id}", @addConnections

    if @model.get('class') is 'placeholder' or @model.has('kind')
      @listenTo @model, 'sync', @render

  toggleSidebar: ->
    currentValue = Cookies.get @cookieKey
    newValue = if currentValue is 'true' then 'false' else 'true'
    @$('.js-block-sidebar').toggleClass 'BlockSidebar--hidden'
    @$('.js-block-content').toggleClass 'BlockContent--wide'
    Cookies.set @cookieKey, newValue

  setupUrlConnections: ->
    @urlConnections = new Blocks []
    @urlConnections.url = "#{sd.API_URL}/blocks/#{@model.id}/channels_by_url"

    @listenTo @urlConnections, 'sync', @renderUrlConnections

    @urlConnections.parse = (data) -> data.channels
    @urlConnections.fetch()

  renderUrlConnections: ->
    @$('.js-url-connections-list').html urlConnectionsTemplate
      urlConnections: @urlConnections.models

    @updateConnectionCount()

  renderConnections: ->
    connections = new Blocks @model.get('connections')
    @$('.js-connections-list').html connectionsTemplate
      connections: connections.models
    @updateConnectionCount()

  updateConnectionCount: ->
    count = @model.get('connections')?.length + @urlConnections.models.length

    s = if count is 1 then '' else 's'
    @$('.js-connection-count').text "#{count or 0} Connection#{s}"

  handleFlick: (e) ->
    direction = if e.direction is 1 then 'left' else 'right'
    @slide direction

  clickSlide: (e) ->
    e.preventDefault()
    direction = $(e.currentTarget).data('direction')
    @slide direction

  scrollDown: ->
    $el = $('.modalize-body, html, body')
    $el.animate { scrollTop: $(".block-sidebar").offset().top }, 200

  slide: (direction) ->
    return unless mediator.shared.blocks?

    mediator.stopListening "connection:added:#{@model.id}"

    @model = mediator.shared.blocks[direction](@model)

    # If we've explictly stated that this block is not loaded yet,
    # load it then unset the flag.
    promise = if @model.get('unloaded')
      Promise(@model.fetch())
        .then => @model.set('unloaded', false)
    else
      Promise.resolve(true)

    promise.then =>
      mediator.trigger 'slide:to:block', @model.id

      _.invoke @subViews, 'remove'

      @initModel()
      @render()
      @xHR?.abort() if @xHR?.readyState > 0 && @xHR?.readyState < 4
      @xHR = @model.fetch()

  addConnections: (connection) ->
    connections = @model.connections()
    connections.unshift connection
    @model.addConnection connection.toJSON()

    @$('.js-connections-list').html connectionsTemplate
      connections: connections

    @updateConnectionCount()

  render: ->
    @$el.html template
      block: @model
      md: markdown
      comments: @comments
      tab: @state.get 'tab'
      user: @user
      connections: @model.connections()
      hideSidebar: Cookies.get @cookieKey
      _: _

    @postRender()

    this

  postRender: ->
    if @user?
      commentView = initComments @model, @$('.js-comments')
      @subViews.push commentView

    if @$('.iconic').length
      _.defer => IconicJS()().inject('img.iconic') # ლ(｡-﹏-｡ ლ)

    for attribute, kind of @editableAttributes
      new EditableAttributeView
        el: @$("#attribute-#{attribute}_#{@model.id}")
        model: @model
        _attribute: attribute
        _kind: kind
        wait: true

    if @state.get('tab') isnt 'info' and not @postRendered
      _.defer =>
        @scrollToTabs()
        @postRendered = true

  scrollToTabs: ->
    $modal = $('.js-modalize-dialog')
    $tabs = $('#block-tabs')
    $modal.scrollTop($modal.scrollTop() - $modal.offset()?.top + $tabs.offset()?.top)

  remove: ->
    mediator.stopListening 'lightbox:slide:next'
    mediator.stopListening 'lightbox:slide:prev'
    mediator.stopListening "connection:added:#{@model.id}"

    super
