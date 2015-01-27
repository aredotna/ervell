Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
Block = require '../../../models/block.coffee'
BlockView = require '../../../components/block_collection/client/block_view.coffee'

module.exports = class BlockSkeletonView extends Backbone.View

  initialize: (options)->
    @channel = options.channel if options?.channel

    @collection.on "add", @appendBlock, @
    @collection.on "created:block", @appendBlock, @
    @collection.on "placeholder:added", @appendBlock, @
    @collection.on "merge:skeleton", @renderSkeleton, @
    @collection.on "placeholders:replaced", @completeRequest, @

    mediator.on 'upload:done', @makeBlock, @

    @collection.loadSkeleton()

    super

  makeBlock: (location) ->
    block = new Block block_type: "Block", source: location
    @collection.create block.toJSON(),
      url: "#{sd.API_URL}/channels/#{@channel.get('slug')}/blocks"
      wait: true

  appendBlock: (model)->
    containerMethod = if model?.options?.wait is true then 'after' else 'append'
    new BlockView
      container: @$el
      model: model
      containerMethod: containerMethod
      channel: @channel

  renderSkeleton: ->
    @queue = []
    @pages = []
    @addWaypoints()

  addWaypoints: ->
    sel = '.grid__block'
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
      # Kinda hacky here, if we don't do this, the
      # callback from the last page waypoint hitting top of page
      # sometimes fires after the 'last' waypoint does when scrolling
      # down
      $(el).waypoint('prev').waypoint('disable')
      _.delay =>
        $(el).waypoint('prev').waypoint('enable') unless @disposed
      , 500

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
    _.each @pages, (page) =>
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

    # Remove any empty placeholders from loaded page
    # $start = if page_id is 1 then @$('> .grid-connectable:first') else @$(".pagemarker[data-page=#{page_id}]")
    # $pageElements = $start.nextUntil('.pagemarker').andSelf()

    # $pageElements = $pageElements.filter('.is-placeholder')

    # view = this
    # # went around the world and this is what i came up with....im not pleased with myself -cab
    # _.delay =>
    #   $pageElements.remove()
    #   # if @pagesLoaded()
    #   #   clearTimeout(@hideTimer) if @hideTimer
    #   #   @hideTimer = setTimeout( =>
    #   #     @$el.addClass('is-loaded')
    #   #   , 1000)
    # , 100

    mediator.trigger 'page:loaded'

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