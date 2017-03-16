_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
markdown = require 'marked'
Cookies = require 'cookies-js'
mediator = require '../../../lib/mediator.coffee'
Block = require '../../../models/block.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Blocks = require '../../../collections/blocks.coffee'
IconicJS = require '../../../components/iconic/client/iconic.min.js'
initComments = require '../../../components/comments/index.coffee'
ConnectView = require '../../../components/connect/client/connect_view.coffee'
EditableAttributeView = require '../../../components/editable_attribute/client/editable_attribute_view.coffee'

template =-> require('../templates/_block.jade') arguments...
connectionsTemplate =-> require('../templates/_connections.jade') arguments...
urlConnectionsTemplate =-> require('../templates/_url_connections.jade') arguments...

class State extends Backbone.Model

module.exports.FullBlockView = class FullBlockView extends Backbone.View
  cookieKey: 'sidebar-hidden'
  events:
    'click .block-mobile-arrow' : 'scrollDown'
    'click .block-arrow' : 'clickSlide'
    'click .js-connect-button' : 'loadConnectView'
    'click .js-toggle-info' : 'toggleSidebar'
    'flick' : 'handleFlick'

  editableAttributes:
    'title'       : 'plaintext'
    'description' : 'markdown'
    'content'     : 'markdown'

  initialize: (options)->
    @state = new State tab: options.tab || 'connections'
    @user = CurrentUser.orNull()
    @postRendered = false

    mediator.on "lightbox:slide:next", => @slide 'next'
    mediator.on "lightbox:slide:prev", => @slide 'prev'

    @initModel()
  initModel: ->
    @model.on 'sync', @renderConnections, @
    @connections = new Blocks @model.connections()
    @setupUrlConnections()

    mediator.on "connection:added:#{@model.id}", @addConnections, @

  toggleSidebar: ->
    currentValue = Cookies.get @cookieKey
    newValue = if currentValue is 'true' then 'false' else 'true'
    @$('.block-sidebar').toggleClass 'is-hidden'
    @$('.block-content').toggleClass 'is-wide'
    Cookies.set @cookieKey, newValue 

  setupUrlConnections: ->
    @urlConnections = new Blocks []
    @urlConnections.url = "#{sd.API_URL}/blocks/#{@model.id}/channels_by_url"
    @urlConnections.on 'sync', @renderUrlConnections, @
    @urlConnections.parse = (data) -> data.channels
    @urlConnections.fetch()

  renderUrlConnections: ->
    @$(".js-url-connections-list").html urlConnectionsTemplate
      urlConnections: @urlConnections.models

    @updateConnectionCount()

  renderConnections: ->
    connections = new Blocks @model.get('connections')
    @$('.js-connections-list').html connectionsTemplate
      connections: connections.models
    @updateConnectionCount()

  updateConnectionCount: ->
    count = @model.get('connections')?.length + @urlConnections.models.length

    s = if count == 1 then '' else 's'
    @$('#tab-connection-count').text "#{count or 0} Connection#{s}"

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

  loadConnectView: (e)->
    e.preventDefault()
    e.stopPropagation()

    $connect_container = @$('.block-connect-container')
    $connect_container.addClass 'is-active'

    new ConnectView
      el: $connect_container
      block: @model

    _.defer =>
      $(".new-connection__done-button").get(0).scrollIntoView()

  slide: (direction)->
    mediator.stopListening "connection:added:#{@model.id}"
    @model = mediator.shared.blocks[direction](@model)

    mediator.trigger 'slide:to:block', @model.id

    @initModel()
    @render()
    @xHR?.abort() if @xHR?.readyState > 0 && @xHR?.readyState < 4
    @xHR = @model.fetch()

  addConnections: (connection) ->
    connections = @model.connections()
    connections.unshift connection
    @model.addConnection connection.toJSON()

    @$(".js-connections-list").html connectionsTemplate
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

    @postRender()

    this

  postRender: ->
    initComments @model, @$('#tab-comments')
    _.defer => IconicJS().inject('img.iconic')

    for attribute, kind of @editableAttributes
      new EditableAttributeView
        model: @model
        el:@$("#attribute-#{attribute}_#{@model.id}")
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
    mediator.stopListening "lightbox:slide:next"
    mediator.stopListening "lightbox:slide:prev"
    mediator.stopListening "connection:added:#{@model.id}"

    super

module.exports.init = ->
  block = new Block sd.BLOCK

  new FullBlockView
    model: block
    el: $(".container")
  .postRender()
