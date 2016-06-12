Backbone = require 'backbone'
_ = require 'underscore'
Backbone.$ = $
mediator = require '../../lib/mediator.coffee'
IconicJS = require '../iconic/client/iconic.min.js'

module.exports = class InfiniteView extends Backbone.View
  disabled: false

  initialize: ({ @context, @itemSelector, @nextPageCallback = $.noop })->
    @initListener()
    mediator.on 'stop:infinite', @disable, @
    mediator.on 'start:infinite', @enable, @

  initListener: ->
    @timer = setInterval @maybeLoad, 150

  maybeLoad: =>
    return if @loading or @disabled or @collection.exhausted

    threshold = 0
    total = document.body.scrollHeight
    progress = (document.documentElement.scrollTop||document.body.scrollTop) + window.innerHeight * 4

    if (total - progress < threshold) and not @disabled and not mediator.shared.state.get 'lightbox'
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
