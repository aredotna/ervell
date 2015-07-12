_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
PathView = require '../../path/client/path_view.coffee'
LightboxRouter = require '../../lightbox/lightbox_router.coffee'

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
    current_path = sd.CURRENT_PATH?.replace sd.CLIENT_PATH, ""

    new LightboxRouter
    Backbone.history.start pushState: false, root: current_path

    if sd.CLIENT_PATH
      Backbone.history.navigate sd.CLIENT_PATH, trigger: true, replace: false

    mediator.on 'load:start', @startLoading, @
    mediator.on 'load:stop', @stopLoading, @
    mediator.on 'slide:to:block', @scrollToBlock

    new PathView el: @$('section.path--header')

    # need to investigate this further.
    # view loses event delegation only on a channel.
    _.defer => @delegateEvents()

    @delegateEvents(@mobileEvents) if $('body').hasClass 'is-mobile'

  startLoading: -> $('body').addClass 'is-loading'

  stopLoading: -> $('body').removeClass 'is-loading'

  scrollToBlock: (block)->
    $el = $("##{block.id}")
    elOffset = $el.offset().top
    elHeight = $el.height()
    windowHeight = $(window).height()

    if elHeight < windowHeight
      offset = elOffset - ((windowHeight / 2) - (elHeight / 2))
    else
      offset = elOffset

    $('html, body').animate {scrollTop: offset}, 100

  intercept: (e)->
    # do not continue if clicking button
    return true if $(e.target).hasClass('button--inblock') || $(e.target).hasClass('grid__block__delete-block') || $(e.target).hasClass('grid__block__delete-block__confirm__choice') || $(e.target).hasClass('grid__block__delete-block__confirm')

    e.preventDefault()
    e.stopImmediatePropagation()

    isBlock = $(e.currentTarget).data('client') is 'Block'
    url = $(e.currentTarget).attr('href')

    if e.metaKey || e.ctrlKey
      url = url.replace(/^\//, '/#') if isBlock
      return window.open(url, '_blank')

    if isBlock
      Backbone.history.navigate "#{url}", trigger: true, replace: false
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
    return unless $('body').hasClass 'is-mobile'

    href = $(e.currentTarget).attr("href")

    if href?.indexOf(location.hostname) > -1 and href isnt "#" and $(e.currentTarget).attr("target") isnt "_blank"
      e.preventDefault()
      e.stopImmediatePropagation()
      window.location = href

  scrollToTop: (e) ->
    e.preventDefault()
    e.stopPropagation()

    $("html, body").animate { scrollTop: 0 }, 300
