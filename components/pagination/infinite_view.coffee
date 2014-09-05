Backbone = require 'backbone'
$ = require 'jquery'
Backbone.$ = $

module.exports = class InfiniteView extends Backbone.View

  initialize: (options)->
    @context = options.context
    @initListener()
    @initLoader()

    super

  initLoader: ->
    @loader = $('<div class="load-indicator">&nbsp;</div>').css height: 200

  initListener: ->
    @timer = setInterval @maybeLoad, 150

  maybeLoad: =>
    return if @loading or @disabled

    threshold = 0
    total = $(@context).prop('scrollHeight')
    progress = $(@context).scrollTop() + $(window).height()*2

    if total - progress < threshold
      @loadNextPage()

  loadNextPage: ->
    return unless request = @collection.loadNext()

    @loading = true
    @startLoader()

    $.when(request).then =>
      @stopLoader()

      _.delay =>
        @loading = false
      , 500

  startLoader: ->
    $(@loader).css('visibility','visible').insertAfter(@$(@options.itemSelector + ':last')).spin()

  stopLoader: ->
    $(@loader).css('visibility','hidden')

  disable: ->
    @disabled = true

  enable: ->
    @disabled = false