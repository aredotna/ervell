Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
ConnectView = require '../../connect/client/connect_view.coffee'
LightboxView = require '../../lightbox/client/lightbox_view.coffee'
IconicJS = require '../../../components/iconic/client/iconic.min.js'
User = require '../../../models/user.coffee'

blockTemplate = -> require('../templates/block.jade') arguments...

module.exports = class BlockView extends Backbone.View
  autoRender: true
  container: null
  containerMethod: 'append'

  events:
    'click .grid__block__overlay' : 'openLightbox'
    'click .grid__block__connect-btn' : 'loadConnectView'

  initialize: (options)->
    @container = options.container if options.container?
    @autoRender = options.autoRender if options.autoRender?
    @containerMethod = options.containerMethod if options.containerMethod?

    @current_user = mediator.shared.current_user

    @render() if @autoRender
    @$el = $("##{@model.id}")

    mediator.on "model:#{@model.id}:updated", @update, @
    mediator.on "connection:#{@model.id}:complete", @removeActiveClass, @

    super

  loadConnectView: (e)=>
    e.preventDefault()
    e.stopPropagation()

    $connect_container = @$('.grid__block__connect-container')
    $connect_container.addClass 'is-active'
    @$('.grid__block__inner').addClass 'is-active'

    $connect_link = @$('.grid__block__link')
    $connect_link.attr('data-disabled', 'true')

    new ConnectView
      el: $connect_container
      block: @model

  update: (model)->
    $("##{model.id}").replaceWith blockTemplate(block: model, user: @current_user)
    @$el = $("##{model.id}")
    @model = model

    IconicJS().inject 'img.iconic'

    @delegateEvents()

  removeActiveClass: ->
    @$('.grid__block__inner').removeClass 'is-active'
    @$('.grid__block__link').removeAttr('data-disabled')

  render: ->
    @container[@containerMethod] blockTemplate(block: @model, user: @current_user)