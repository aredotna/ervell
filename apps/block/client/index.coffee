_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
markdown = require 'marked'
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

class State extends Backbone.Model

module.exports.FullBlockView = class FullBlockView extends Backbone.View

  events:
    'click .block-arrow' : 'clickSlide'
    'click .tab--container__nav__item' : 'toggleTab'
    'click .js-connect-button' : 'loadConnectView'
    'click .list-item__connection' : 'openChannel'

  editableAttributes:
    'title'       : 'plaintext'
    'description' : 'markdown'
    'content'     : 'markdown'

  initialize: (options)->
    @state = new State tab: options.tab || 'info'
    @user = CurrentUser.orNull()
    @postRendered = false

    mediator.on "lightbox:slide:next", => @slide 'next'
    mediator.on "lightbox:slide:prev", => @slide 'prev'

    @initModel()

  initModel: ->
    @model.on 'sync', @render, @
    @connections = new Blocks @model.connections()

    mediator.on "connection:added:#{@model.id}", @addConnections, @

  toggleTab: (e)->
    e.preventDefault()
    e.stopPropagation()

    $('.tab--container__nav__item.is-active, .tab-content.is-active').removeClass 'is-active'
    @state.set tab: $(e.currentTarget).data 'tab'
    $(e.currentTarget).addClass 'is-active'
    $("#tab-#{@state.get('tab')}").addClass 'is-active'

    @scrollToTabs()

  clickSlide: (e) ->
    e.preventDefault()
    direction = $(e.currentTarget).data('direction')
    @slide direction

  openChannel: (e) ->
    href = $(e.currentTarget).attr('href')
    target = $(e.currentTarget).attr('target') || '_self'

    if e.metaKey || e.ctrlKey
      window.open href, '_blank'
    else
      window.open href, target

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

    @$(".tab-connections-list").html connectionsTemplate
      connections: connections

    s = if @model.get('connections').length == 1 then '' else 's'
    @$('#tab-connection-count').text "#{@model.get('connections').length} Connection#{s}"

  render: ->
    @$el.html template
      block: @model
      md: markdown
      comments: @comments
      tab: @state.get 'tab'
      user: @user
      connections: @model.connections()

    @postRender()

    this

  postRender: ->
    initComments @model, @$('#tab-comments .tab-content__inner')
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
    $modal.scrollTop($modal.scrollTop() - $modal.offset().top + $tabs.offset().top)

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
