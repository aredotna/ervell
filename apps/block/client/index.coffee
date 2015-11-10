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

module.exports.FullBlockView = class FullBlockView extends Backbone.View

  events:
    'click .block-arrow' : 'clickSlide'
    'click .tab--container__nav__item' : 'toggleTab'
    'click .js-connect-button' : 'loadConnectView'

  editableAttributes:
    'title'       : 'plaintext'
    'description' : 'markdown'
    'content'     : 'markdown'

  initialize: (options)->
    @tab = options.tab || 'info'
    @user = CurrentUser.orNull()

    mediator.on "lightbox:slide:next", => @slide 'next'
    mediator.on "lightbox:slide:prev", => @slide 'prev'
    mediator.on "connection:added:#{@model.id}", @addConnections, @

    @initModel()

  initModel: ->
    @model.on 'sync', @render, @
    @connections = new Blocks @model.connections()

  toggleTab: (e)->
    e.preventDefault()

    $('.tab--container__nav__item.is-active, .tab-content.is-active').removeClass 'is-active'
    tab = $(e.currentTarget).data 'tab'
    $(e.currentTarget).addClass 'is-active'
    $("#tab-#{tab}").addClass 'is-active'

    @scrollToTabs()

  clickSlide: (e) ->
    e.preventDefault()
    direction = $(e.currentTarget).data('direction')
    @slide direction

  loadConnectView: (e)->
    e.preventDefault()
    e.stopPropagation()

    $connect_container = @$('.block-connect-container')
    $connect_container.addClass 'is-active'

    new ConnectView
      el: $connect_container
      block: @model
      kind: 'block'

    _.defer =>
      $(".new-connection__done-button").get(0).scrollIntoView()

  slide: (direction)->
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
      tab: @tab
      user: @user
      connections: @model.connections()

    @postRender()

    this

  postRender: ->
    initComments @model, @$('#tab-comments .tab-content__inner')
    _.defer => IconicJS().inject('img.iconic')

    unless @tab is 'info'
      _.defer => @scrollToTabs()

    for attribute, kind of @editableAttributes
      new EditableAttributeView
        model: @model
        el:@$("#attribute-#{attribute}_#{@model.id}")
        _attribute: attribute
        _kind: kind
        wait: true

  scrollToTabs: ->
    $("#block-tabs").get(0).scrollIntoView()

module.exports.init = ->
  block = new Block sd.BLOCK

  new FullBlockView
    model: block
    el: $(".container")
  .postRender()
