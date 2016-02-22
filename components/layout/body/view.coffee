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
    $el = $("##{id}")
    elOffset = $el.offset().top
    elHeight = $el.height()
    windowHeight = $(window).height()

    if elHeight < windowHeight
      offset = elOffset - ((windowHeight / 2) - (elHeight / 2))
    else
      offset = elOffset

    $('html, body').animate { scrollTop: offset }, delay

  intercept: (e)->
    # do not continue if clicking button
    return true if $(e.target).hasClass('button--inblock') || $(e.target).hasClass('grid__block__delete-block') || $(e.target).hasClass('grid__block__delete-block__confirm__choice') || $(e.target).hasClass('grid__block__delete-block__confirm')

    e.preventDefault()
    e.stopImmediatePropagation()

    clientRoute = $(e.currentTarget).data('client')
    url = $(e.currentTarget).attr('href')

    if clientRoute and clientRoute isnt 'Channel' and clientRoute isnt 'User'
      Backbone.history.navigate "#{url}", trigger: true, replace: false
    else
      trackOutboundLink url, =>
        if e.metaKey || e.ctrlKey
          window.open(url, '_blank')
        else
          window.location = url

  triggerMediator: (e)->
    $link = $(e.currentTarget)
    mediator.trigger $link.data('trigger')

  disable: (e)->
    e.preventDefault()
    e.stopPropagation()

  bodyClick: (e) ->
    mediator.trigger 'body:click', e

  maybeIntercept: (e)->
    href = $(e.currentTarget).attr("href")
    target = $(e.currentTarget).attr("target") || '_self'

    unless href?.indexOf(location.hostname) > -1
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
