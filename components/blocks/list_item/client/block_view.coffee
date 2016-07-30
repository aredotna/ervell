Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../../lib/mediator.coffee'
ConnectView = require '../../../connect/client/connect_view.coffee'
IconicJS = require '../../../../components/iconic/client/iconic.min.js'
FollowButtonView = require '../../../follow_button/client/follow_button_view.coffee'
User = require '../../../../models/user.coffee'
{ trackOutboundLink } = require '../../../../lib/analytics.coffee'
analytics = require '../../../../lib/analytics.coffee'

blockTemplate = -> require('../templates/block.jade') arguments...

module.exports = class BlockView extends Backbone.View
  autoRender: true
  container: null
  containerMethod: 'append'

  events:
    'click .block-collection--list__column__source'  : 'openLink'
    'click .block-collection--list__column__connect' : 'loadConnectView'
    'click .edit-button' : 'startEditMode'
    'click .check-button' : 'quitEditMode'
    'click .delete-button'  : 'confirmDestroy'
    'click .tooltip__choice' : 'confirmChoice'

  initialize: (options)->
    { @container, @autoRender, @containerMethod, @channel } = options

    @current_user = mediator.shared.current_user

    @render() if @autoRender
    @$el = $("##{@model.id}") unless @el
    @renderFollowButton()

    @delegateEvents()

    @model.on 'remote_update', @update, @
    @model.on 'show', @show, @
    @model.on 'hide', @hide, @
    @model.on 'change:is_editing', @update

    mediator.on "model:#{@model.id}:updated", @update, @
    mediator.on "connection:#{@model.id}:complete", @removeActiveClass, @
    mediator.on "body:click", @removeActiveClass, @

  show: ->
    @$el.show()

  hide: ->
    @$el.hide()

  startEditMode: (e) ->
    e.preventDefault()
    e.stopPropagation()
    @$el.addClass 'is-being-edited'

  quitEditMode: (e) ->
    e.preventDefault()
    e.stopPropagation()
    @$el.removeClass 'is-being-edited'

  loadConnectView: (e)=>
    e.preventDefault()
    e.stopPropagation()

    $connect_container = @$('.connect-container')
    $connect_container.addClass 'is-active'

    new ConnectView
      el: $connect_container
      block: @model

  openLink: (e)->
    analytics.track.click "Block source opened"

    url = @model.getSourceUrl()

    e.preventDefault()
    e.stopImmediatePropagation()
    trackOutboundLink url
    if @model.get('visibility') is 'private'
      site = window.open "#{sd.APP_URL}/go?redirect-to=#{url}", "_blank"
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

    @renderFollowButton()
    @delegateEvents()

  removeActiveClass: (e)->
    return false unless !e or (!@$el.is(e.target) and @$el.has(e.target).length is 0)
    @$('.grid__block__inner').removeClass 'is-active'
    @$('.grid__block__link').removeAttr('data-disabled')

  render: ->
    @container[@containerMethod] blockTemplate
      block: @model
      user: @current_user
      channel: @channel

    @$el = $("##{@model.id}")

    @renderFollowButton()

  confirmDestroy: (e) =>
    e.preventDefault()
    e.stopImmediatePropagation()
    @$('.tooltip').addClass 'tooltip--is-active'

  confirmChoice: (e) =>
    e.preventDefault()
    e.stopImmediatePropagation()
    choice = $(e.currentTarget).data('choice')

    @cancelDestroy() if choice is 'cancel'
    @destroyConnection() if choice is 'destroy'

  cancelDestroy: ->
    @$('.tooltip').removeClass 'tooltip--is-active'

  destroyConnection: ->
    @model.destroy channel: @channel

    analytics.track.click "Block removed from channel"

    @remove()

  renderFollowButton: ->
    if @model.get('base_class') is 'Channel' or @model.get('base_class') is 'User' && sd.CURRENT_USER
      new FollowButtonView
        el: @$('.block-collection--list__column__follow')
        model: @model
        showTitle: false
