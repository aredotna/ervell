Backbone = require 'backbone'
$ = require 'jquery'
_ = require 'underscore'
Backbone.$ = $

module.exports = class InfiniteView extends Backbone.View

  initialize: (options)->
    @context = options.context
    @itemSelector = options.itemSelector
    @initListener()
    @initLoader()
    console.log '@context', @context
    super

  initLoader: ->
    @loader = $('<div class="load-indicator">&nbsp;</div>').css height: 200

  initListener: ->
    @timer = setInterval @maybeLoad, 150

  maybeLoad: =>
    return if @loading or @disabled

    threshold = 0
    total = $('body').prop('scrollHeight')
    progress = $('body').scrollTop() + $(window).height()*2

    if total - progress < threshold
      console.log('loading next page')
      @loadNextPage()

  loadNextPage: ->
    return unless request = @collection.loadNext()

    @loading = true
    @startLoader()

    $.when(request).then =>
      console.log 'request done'
      @stopLoader()

      _.delay =>
        console.log 'loading=false'
        @loading = false
      , 500

  startLoader: ->
    # $(@loader).css('visibility','visible').insertAfter(@$(@itemSelector + ':last')).spin()

  stopLoader: ->
    # $(@loader).css('visibility','hidden')

  disable: ->
    @disabled = true

  enable: ->
    @disabled = false