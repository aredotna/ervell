Backbone = require 'backbone'
_ = require 'underscore'
Backbone.$ = $
mediator = require '../../lib/mediator.coffee'
IconicJS = require '../iconic/client/iconic.min.js'

module.exports = class InfiniteView extends Backbone.View
  threshold: -500
  progress: 0
  disabled: false

  initialize: ({ @context, @itemSelector, @nextPageCallback = $.noop })->
    @initListener()
    mediator.on 'stop:infinite', @disable, @
    mediator.on 'start:infinite', @enable, @
    mediator.on 'position:updated', @updatePosition, @

  initListener: ->
    @timer = setInterval @maybeLoad, 150

  updatePosition: (pos) =>
    return if @disabled
    if parseInt($('.container').css('top')) + @progress < -(@threshold) 
      @loadNextPage()
      @progress = parseInt($('.container').height())

  maybeLoad: =>
    return if @loading or 
      @disabled or 
      @collection.exhausted or 
      mediator.shared.state.get 'lightbox'

    total = document.body.scrollHeight
    @progress = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight * 4

    if (total - @progress < @threshold) and not @disabled 
      @loadNextPage()

  loadNextPage: ->
    return unless request = @collection.loadNext()

    @loading = true
    @startLoader()

    $.when(request).then =>
      @nextPageCallback request
      @stopLoader()

      _.delay =>
        @loading = false
        IconicJS().inject 'img.iconic'
      , 500

  startLoader: ->
    $('#l-infinite-loader-container').addClass 'is-loading'

  stopLoader: ->
    $('#l-infinite-loader-container').removeClass 'is-loading'

  disable: ->
    @disabled = true

  enable: ->
    @disabled = false
