Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../../lib/mediator.coffee'
ConnectView = require '../../../connect/client/connect_view.coffee'
Comments = require '../../../../collections/comments.coffee'
IconicJS = require '../../../../components/iconic/client/iconic.min.js'
FollowButtonView = require '../../../follow_button/client/follow_button_view.coffee'
User = require '../../../../models/user.coffee'
{ trackOutboundLink } = require '../../../../lib/analytics.coffee'
analytics = require '../../../../lib/analytics.coffee'
EditableAttributeView = require '../../../editable_attribute/client/editable_attribute_view.coffee'

blockTemplate = -> require('../templates/block.jade') arguments...
commentsTemplate = -> require('../templates/types/partials/_comments.jade') arguments...

module.exports = class BlockView extends Backbone.View
  autoRender: true
  container: null
  containerMethod: 'append'

  events:
    'click .block-collection--list__column__source'  : 'openLink'
    'click .block-collection--list__column__connect' : 'loadConnectView'
    'mouseenter .block-collection--list__column--comment' : 'loadLastComment'
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
    @renderEditableAttribute()

  quitEditMode: (e) ->
    e.preventDefault()
    e.stopPropagation()
    @editable.remove()
    @update @model

  loadConnectView: (e)=>
    e.preventDefault()
    e.stopPropagation()

    $connect_container = @$('.connect-container')
    $connect_container.addClass 'is-active'

    new ConnectView
      el: $connect_container
      block: @model

  loadLastComment: ->
    return false if @model.has('last_comment') or @model.get('comment_count') is 0
    comments = new Comments null, block: @model
    comments.fetch
      data: per: 1
      success: (comments) =>
        if comments
          @model.set last_comment: comments?.first()?.get('body')
          @$('.block-collection--list__column--comment').html commentsTemplate block: @model

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

  renderEditableAttribute: ->
    @editable = new EditableAttributeView
      model: @model
      el: @$(".attribute-title")
      _attribute: 'title'
      _kind: 'plaintext'
      wait: true
