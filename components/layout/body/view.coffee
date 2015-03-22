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

    @delegateEvents(@mobileEvents) if $('body').hasClass 'is-mobile'

  startLoading: -> $('body').addClass 'is-loading'

  stopLoading: -> $('body').removeClass 'is-loading'

  scrollToBlock: (block)->
    $el = $("##{block.id}")
    elOffset = $el.offset().top
    elHeight = $el.height()
    windowHeight = $(window).height()
    offset

    if elHeight < windowHeight
      offset = elOffset - ((windowHeight / 2) - (elHeight / 2))
    else
      offset = elOffset

    $('html, body').animate {scrollTop: offset}, 100

  intercept: (e)->
    e.preventDefault()
    e.stopImmediatePropagation()

    # do not continue if clicking button
    return false if $(e.target).hasClass 'button--inblock'

    isBlock = $(e.currentTarget).data('client') is 'Block'
    url = $(e.currentTarget).attr('href')

    if e.metaKey || e.ctrlKey
      url = url.replace(/^\//, '/#') if isBlock
      return window.open(url, '_blank')

    if isBlock
      Backbone.history.navigate "#{url}", trigger: true, replace: false
    else
      window.location = url

  disable: (e)->
    e.preventDefault()
    e.stopPropagation()

  bodyClick: (e) -> mediator.trigger 'body:click', e

  maybeIntercept: (e)->
    return unless $('body').hasClass 'is-mobile'

    href = $(e.currentTarget).attr("href")

    if href.indexOf(location.hostname) > -1 and href isnt "#" and $(e.currentTarget).attr("target") isnt "_blank"
      e.preventDefault()
      e.stopImmediatePropagation()
      window.location = href

  scrollToTop: (e) ->
    e.preventDefault()
    e.stopPropagation()

    $("html, body").animate { scrollTop: 0 }, 300
