Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
ConnectView = require '../../connect/client/connect_view.coffee'
LightboxView = require '../../lightbox/client/lightbox_view.coffee'
IconicJS = require '../../../components/iconic/client/iconic.min.js'
FollowButtonView = require '../../follow_button/client/follow_button_view.coffee'
User = require '../../../models/user.coffee'

blockTemplate = -> require('../templates/block.jade') arguments...

module.exports = class BlockView extends Backbone.View
  autoRender: true
  container: null
  containerMethod: 'append'

  events:
    'tap .grid__block__source__link': 'openLink'
    'tap .grid__block__connect-btn' : 'loadConnectView'
    'tap .grid__block__delete-block': 'destroyConnection'

  initialize: (options)->
    @container = options.container if options.container?
    @autoRender = options.autoRender if options.autoRender?
    @containerMethod = options.containerMethod if options.containerMethod?

    @channel = options.channel if options.channel?
    @current_user = mediator.shared.current_user

    @render() if @autoRender
    @$el = $("##{@model.id}")
    @renderFollowButton()

    @model.on 'remote_update', @update, @
    @model.on 'show', @show, @
    @model.on 'hide', @hide, @

    mediator.on "model:#{@model.id}:updated", @update, @
    mediator.on "connection:#{@model.id}:complete", @removeActiveClass, @

    super

  show: ->
    @$el.show()

  hide: ->
    @$el.hide()

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

  openLink: (e)->
    e.preventDefault()
    e.stopImmediatePropagation()

    if @model.get('source').url
      url = @model.get('source').url
    else if @model.get('attachment').url
      url = @model.get('attachment').url
    else
      url = @model.getImageSize('display')

    if @channel and @channel.get('status') is 'private'
      instance = window.open("about:blank")
      instance.document.write("<meta http-equiv=\"refresh\" content=\"0;url=#{url}\">");
      instance.document.close()
    else
      window.open url,'_blank'
      return false

  update: (model)->
    args =
      block: model
      user: @current_user

    args['channel'] = @channel if @channel?

    $("##{model.id}").replaceWith blockTemplate args
    @$el = $("##{model.id}")
    @model = model

    IconicJS().inject 'img.iconic'

    @delegateEvents()

  removeActiveClass: ->
    @$('.grid__block__inner').removeClass 'is-active'
    @$('.grid__block__link').removeAttr('data-disabled')

  render: ->
    if @containerMethod isnt 'before' and @containerMethod isnt 'after'
      @container[@containerMethod] blockTemplate(block: @model, user: @current_user)
    else
      @container.find('.grid__block--new-block')[@containerMethod] blockTemplate(block: @model, user: @current_user)

    @renderFollowButton()

  destroyConnection: (e) ->
    model = @model
    view = @

    @model.destroy
      channel: @channel

    view.remove()

    e.preventDefault()
    e.stopPropagation()

  renderFollowButton: ->
    if @model.get('class') is 'Channel' or @model.get('class') is 'User' && sd.CURRENT_USER
      new FollowButtonView
        el: @$('.grid__block__follow_btn')
        model: @model
        showTitle: false
