_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
{ trackOutboundLink } = require '../../../lib/analytics.coffee'
Router = require '../router.coffee'

module.exports = class BodyView extends Backbone.View

  events:
    'click'                                       : 'bodyClick'
    'click a[data-disabled]'                      : 'disable'
    'click a[data-client]:not([data-disabled])'   : 'intercept'
    'click span[data-client]:not([data-disabled])': 'intercept'
    'click .trigger-mediator'                     : 'triggerMediator'
    'click a'                                     : 'maybeIntercept'
    'click #scroll-top'                           : 'scrollToTop'

  mobileEvents:
    'tap'                                         : 'bodyClick'
    'tap a[data-disabled]'                        : 'disable'
    'tap a[data-client]:not([data-disabled])'     : 'intercept'
    'tap span[data-client]:not([data-disabled])'  : 'intercept'
    'tap a'                                       : 'maybeIntercept'
    'tap #scroll-top'                             : 'scrollToTop'

  initialize: (options) ->
    new Router
    Backbone.history.start pushState: true

    mediator.on 'load:start', @startLoading, @
    mediator.on 'load:stop', @stopLoading, @
    mediator.on 'slide:to:block', @scrollToBlock
    mediator.shared.state.on 'change:isDraggingBlocks', @triggerReflow, @

    # need to investigate this further.
    # view loses event delegation only on a channel.
    _.defer => @delegateEvents()

    @delegateEvents(@mobileEvents) if $('body').hasClass 'is-mobile'

  startLoading: -> $('body').addClass 'is-loading'

  stopLoading: -> $('body').removeClass 'is-loading'

  scrollToBlock: (id, delay = 100)->
    isLightBox = $('body').hasClass 'is-scrolling-disabled'
    $el = $("##{id}")
    elOffset = if isLightBox then $el.position().top else $el.offset().top
    elHeight = $el.height()
    windowHeight = $(window).height()

    if elHeight < windowHeight
      offset = elOffset - ((windowHeight / 2) - (elHeight / 2))
    else
      offset = elOffset

    if isLightBox
      offset = elOffset + ((windowHeight / 2) - (elHeight / 2))
      $('.container').css { top: -offset }
      mediator.trigger 'position:updated', offset
    else
      $('html, body').animate { scrollTop: offset }, delay

  intercept: (e)->
    shouldIgnore = $(e.target).hasClass('button--inblock') or
     $(e.target).hasClass('grid__block__delete-block') or
     $(e.target).hasClass('grid__block__delete-block__confirm__choice') or
     $(e.target).hasClass('grid__block__delete-block__confirm') or
     $(e.currentTarget).hasClass('is-being-edited')

    return true if shouldIgnore

    clientRoute = $(e.currentTarget).data('client')
    url = $(e.currentTarget).attr('href')

    modifier = e.metaKey || e.ctrlKey

    if clientRoute and clientRoute isnt 'Channel' and clientRoute isnt 'User' and !modifier
      e.preventDefault()
      e.stopImmediatePropagation()
      Backbone.history.navigate "#{url}", trigger: true, replace: false
    else if url.indexOf('http')
      trackOutboundLink(url)

  triggerMediator: (e)->
    $link = $(e.currentTarget)
    mediator.trigger $link.data('trigger')

  disable: (e)->
    e.preventDefault()
    e.stopPropagation()

  bodyClick: (e) ->
    mediator.trigger 'body:click', e

  maybeIntercept: (e)->
    trackOutboundLink(href) if url.indexOf('http')

  triggerReflow: =>
    top = $(window).scrollTop()
    $('body').css display: 'none'
    $('body').offset().height
    $('body').css display: 'block'
    $(window).scrollTop top

  scrollToTop: (e) ->
    e.preventDefault()
    e.stopPropagation()

    $("html, body").animate { scrollTop: 0 }, 300
