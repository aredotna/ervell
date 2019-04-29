_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
{ trackOutboundLink } = require '../../../lib/analytics.coffee'

module.exports = class BodyView extends Backbone.View
  events:
    'click': 'bodyClick'
    'click a[data-disabled]': 'disable'
    'click a[data-client]:not([data-disabled])': 'dataClientNavigate'
    'click span[data-client]:not([data-disabled])': 'dataClientNavigate'
    'click .trigger-mediator': 'triggerMediator'

  mobileEvents:
    'tap a[data-disabled]': 'disable'
    'tap a[data-client]:not([data-disabled])': 'dataClientNavigate'
    'tap span[data-client]:not([data-disabled])': 'dataClientNavigate'

  initialize: (options) ->
    @listenTo mediator, 'load:start', @startLoading
    @listenTo mediator, 'load:stop', @stopLoading
    @listenTo mediator, 'slide:to:block', @scrollToBlock
    @listenTo mediator.shared.state, 'change:isDraggingBlocks', @triggerReflow

    # need to investigate this further.
    # view loses event delegation only on a channel.
    _.defer => @delegateEvents() # HM

    if $('body').hasClass 'is-mobile'
      _.defer => @delegateEvents(@mobileEvents)

  startLoading: ->
    $('body').addClass 'is-loading'

  stopLoading: ->
    $('body').removeClass 'is-loading'

  scrollToBlock: (id, delay = 100) ->
    isLightBox = $('body').hasClass 'is-scrolling-disabled'
    $el = $("[data-id=#{id}]")
    return unless $el.length
    elOffset = if $el.is('a') then $el.parent().position().top else $el.position().top
    elHeight = $el.height()
    windowHeight = $(window).height()

    if elHeight < windowHeight
      offset = elOffset - ((windowHeight / 2) - (elHeight / 2))
    else
      offset = elOffset

    if isLightBox
      offset = elOffset + ((windowHeight / 2) - (elHeight / 2))
      $('.js-container').css { top: -offset }
      mediator.trigger 'position:updated', offset
    else
      $('html, body').animate { scrollTop: offset }, delay

  # TODO: This should be part of the related views
  dataClientNavigate: (e) ->
    $target = $(e.currentTarget)

    href = $target.attr('href')
    clientRoute = $target.data('client')
    isModified = e.metaKey or e.ctrlKey

    return if clientRoute is 'Channel' or clientRoute is 'User' or isModified

    e.preventDefault()

    Backbone.history.navigate(href, {
      trigger: true,
      replace: false,
    })

  triggerMediator: (e) ->
    $link = $(e.currentTarget)
    mediator.trigger $link.data('trigger')

  disable: (e) ->
    e.preventDefault()
    e.stopImmediatePropagation()

  bodyClick: (e) ->
    mediator.trigger 'body:click', e

  triggerReflow: =>
    top = $(window).scrollTop()
    $('body').css display: 'none'
    $('body').offset().height
    $('body').css display: 'block'
    $(window).scrollTop top
