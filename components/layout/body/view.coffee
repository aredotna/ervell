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

  mobileEvents:
    'tap a[data-disabled]'                        : 'disable'
    'tap a[data-client]:not([data-disabled])'     : 'intercept'
    'tap span[data-client]:not([data-disabled])'  : 'intercept'
    'tap #scroll-top'                             : 'scrollToTop'
    'tap a'                                       : 'maybeIntercept'

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

    if $('body').hasClass 'is-mobile'
      _.defer => @delegateEvents(@mobileEvents)

  startLoading: -> $('body').addClass 'is-loading'

  stopLoading: -> $('body').removeClass 'is-loading'

  scrollToBlock: (id, delay = 100)->
    isLightBox = $('body').hasClass 'is-scrolling-disabled'
    $el = $("[data-id=#{id}]")
    elOffset = if isLightBox then $el.position().top else $el.offset().top
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

  intercept: (e)->
    shouldIgnore = $(e.target).hasClass('button--inblock') or
     $(e.target).hasClass('grid__block__delete-block') or
     $(e.target).hasClass('grid__block__delete-block__confirm__choice') or
     $(e.target).hasClass('grid__block__delete-block__confirm') or
     $(e.currentTarget).hasClass('is-being-edited') or
     $(e.target).hasClass('block-collection--list__column__follow')

    return true if shouldIgnore

    e.preventDefault()
    e.stopImmediatePropagation()

    clientRoute = $(e.currentTarget).data('client')
    url = $(e.currentTarget).attr('href')

    modifier = e.metaKey || e.ctrlKey

    if clientRoute and clientRoute isnt 'Channel' and clientRoute isnt 'User' and !modifier
      Backbone.history.navigate "#{url}", trigger: true, replace: false
    else
      trackOutboundLink(url) if url.indexOf('http')
      if e.metaKey || e.ctrlKey
        window.open(url, '_blank')
      else
        window.location = url

  triggerMediator: (e)->
    $link = $(e.currentTarget)
    mediator.trigger $link.data('trigger')

  disable: (e)->
    e.preventDefault()
    e.stopImmediatePropagation()

  bodyClick: (e) ->
    mediator.trigger 'body:click', e

  maybeIntercept: (e)->
    href = $(e.currentTarget).attr("href")
    target = $(e.currentTarget).attr("target") || '_self'

    unless href?.indexOf(location.hostname) > -1 or href is '#'
      e.preventDefault()
      e.stopImmediatePropagation()
      trackOutboundLink href

      if e.metaKey || e.ctrlKey
        window.open href, '_blank'
      else
        window.open href, target

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
