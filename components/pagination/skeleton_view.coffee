Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
Blocks = require '../../collections/blocks.coffee'
mediator = require '../../lib/mediator.coffee'

module.exports = class SkeletonView extends Backbone.View

  initialize: ->
    @collection.on "placeholders:replaced", @completeRequest, @

    @setupSkeleton()

  setupSkeleton: ->
    _.defer =>
      @queue = []
      @pages = []
      @addWaypoints()

  addWaypoints: ->
    sel = '.block-item'
    @addPage 0
    @addPage 1
    @$("#{sel}:nth-child(#{@collection.options.per}n)").not('.grid__block--new-block').each (i, el)=>
      unless $(el).is(@$("#{sel}:last"))
        @addPage i+2
        $(el).after "<span id='page-#{i+2}' class='pagemarker' data-page='#{i+2}'></span>"

    $("<span class='pagemarker' data-page='last'></span>").insertAfter(@$("#{sel}:last"))


    # init waypoints (for top and bottom)
    that = this
    $('.pagemarker').waypoint
      handler: (direction) -> that.checkWaypoint this, direction

    $('.pagemarker').waypoint
      handler: (direction) -> that.checkWaypoint this, direction
      offset: 'bottom-in-view'

    # load initial
    @resetQueue([1, 2, 3])

  checkWaypoint: (el, direction)->
    current = $(el.element).data('page')

    if current is 'last'
      direction = 'up'
      current = $('.pagemarker').length

    @collection.loadDirection = direction

    if direction is 'up'
      toLoad = [current, current - 1, current + 1, current - 2, current - 3]
    else
      toLoad = [current, current + 1, current - 1, current + 2, current - 2]

    @resetQueue(toLoad)

  addPage: (id)->
    @pages[id] =
      loaded: false
      loading: false
      xhr: {}
      num: id

  get: (id) -> @pages[id]

  pageLoading: (id) ->
    @pages[id].loading = true

  pageLoaded: (id) ->
    @pages[id].loaded = true
    --@loading
    @startLoad()

  resetQueue: (items=[]) ->
    @queue = items
    @cancelStaleRequests()
    @loading = _.filter(@pages, (page)=>page.loading).length
    @startLoad()

  cancelStaleRequests: ->
    for page, key in @pages
      if page.loading and not _.include(@queue, page.num)
        @cancelRequest(page.num)

  cancelAllRequests: ->
    _.each @pages, (page) =>
      @cancelRequest(page.num)

  startLoad: ->
    (load = =>
      return unless @queue.length and (@loading < 2)

      current = @queue.shift()

      if @pages[current] and not @pages[current].loading and not @pages[current].loaded
        ++@loading

        @setPlaceholdersLoading(current)

        @pages[current] =
          xhr: @collection.loadPage current, @
          loaded: false
          loading: true
          num: current

      load()
    )()

  setPlaceholdersLoading: (id) -> $("#page-#{id}").nextUntil("#page-#{id + 1}").addClass('loading')

  unsetPlaceholdersLoading: (id) -> $("#page-#{id}").nextUntil("#page-#{id + 1}").removeClass('loading')

  completeRequest: (page_id) ->
    @pagesLoaded()
    @markPageLoaded(page_id)
    @startLoad()

    mediator.trigger 'page:loaded'
    mediator.shared.blocks = @collection

    # $start = if page_id is 1 then @$('> .grid__block:first') else @$(".pagemarker[data-page=#{page_id}]")
    # $pageElements = $start.nextUntil('.pagemarker').andSelf()

    # $pageElements = $pageElements.filter('.grid__block--placeholder')

    # _.delay =>
    #   $pageElements.remove()
    # , 100

  markPageLoaded: (id) ->
    @pages[id]?.loaded = true
    @pages[id]?.loading = false
    --@loading

  pagesLoaded: ->
    _.each @pages, (page)->
      return false unless page.loaded

    return true

  cancelRequest: (id)->
    @pages[id]?.xhr?.abort?()
    @pages[id]?.loaded = false
    @pages[id]?.loading = false
    @unsetPlaceholdersLoading(id)
