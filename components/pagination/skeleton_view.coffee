_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'

module.exports = class SkeletonView extends Backbone.View
  queue: []
  pages: {}

  selector: '.js-block'

  initialize: ->
    @listenTo @collection, 'placeholders:replaced', @completeRequest

    # _.defer => # TODO: ?
    @addWaypoints()

  indexPage: ({ number, el, waypoints }) ->
    @pages[number] =
      number: number
      el: el
      waypoints: waypoints
      loaded: false
      loading: false
      xhr: {}

  addWaypoints: ->
    @indexPage number: 0
    @indexPage number: 1

    @markPages
      $collection: @$("#{@selector}:nth-child(#{@collection.options.per}n)")
      $last: @$("#{@selector}:last")

    @resetQueue [1, 2, 3]

  markPages: ({ $collection, $last }) ->
    # TODO: Remove debugging styles
    $collection.add($last).css 'outline', '2px solid blue'

    $collection.map (i, el) =>
      $(el).attr 'data-page', page = i + 2

      @indexPage
        number: page
        el: el
        waypoints: @generateWaypoints el

    # TODO: Is this even needed?
    $last.data 'page', 'last'

  generateWaypoints: (el) ->
    view = this

    {
      top: new Waypoint
        element: el
        handler: (direction) ->
          view.checkWaypoint this, direction

      bottom: new Waypoint
        element: el
        offset: 'bottom-in-view'
        handler: (direction) ->
          view.checkWaypoint this, direction
    }


  checkWaypoint: (el, direction) ->
    current = $(el.element).data 'page'

    if current is 'last'
      direction = 'up'
      current = Object.keys(@pages).length

    @collection.loadDirection = direction

    # TODO: How does this work?
    # Would this still work if you were to change the pagination amount?
    toLoad = if direction is 'up'
      [
        current
        current - 1
        current + 1
        current - 2
        current - 3
      ]
    else
      [
        current
        current + 1
        current - 1
        current + 2
        current - 2
      ]

    @resetQueue toLoad

  resetQueue: (items = []) ->
    @queue = items

    @cancelStaleRequests()

    @loading = _.filter(@pages, ({ loading }) => loading).length

    @startLoad()

  cancelStaleRequests: ->
    for page, key in @pages
      if page.loading and not _.include(@queue, page.number)
        @cancelRequest page.number

  startLoad: ->
    (load = =>
      return unless @queue.length and @loading < 2

      current = @queue.shift()

      if @pages[current] and (not @pages[current].loading) and (not @pages[current].loaded)
        ++@loading

        @pages[current] = _.extend @pages[current],
          xhr: @collection.loadPage current, this
          loaded: false
          loading: true

      load()
    )()

  completeRequest: (id) ->
    @markPageLoaded id
    @startLoad()

    if waypoints = @pages[id].waypoints
      waypoints.top.destroy()
      waypoints.bottom.destroy()

    mediator.shared.blocks = @collection

  markPageLoaded: (id) ->
    @pages[id]?.loaded = true
    @pages[id]?.loading = false

    --@loading

  cancelRequest: (id) ->
    @pages[id]?.xhr?.abort?()
    @pages[id]?.loaded = false
    @pages[id]?.loading = false
