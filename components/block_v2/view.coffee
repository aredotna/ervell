Backbone = require 'backbone'
Block = require '../../models/block.coffee'
ConnectView = require '../connect/client/connect_view.coffee'
analytics = require '../../lib/analytics.coffee'
mediator = require '../../lib/mediator.coffee'

module.exports = class BlockView extends Backbone.View

  events: 
    'click .js-source' : 'openSource'
    'click .js-connect' : 'openConnect'

  initialize: ({ @block }) ->
    mediator.on "connection:#{@block.id}:complete", @removeActiveClass, @

  openSource: (e) ->
    analytics.track.click "Block source opened"

    url = @block.source.url or @block.kind.file_url

    e.preventDefault()
    e.stopImmediatePropagation()

    analytics.trackOutboundLink url

    window.open url,'_blank'

    false

  removeActiveClass: ->
    @$el.removeClass 'Block--is_connecting'

  openConnect: (e) ->
    e.preventDefault()
    e.stopPropagation()

    $connectContainer = @$('.Block__inner__connect')
    @$el.addClass 'Block--is_connecting'

    # temp: get a real block
    block = new Block id: @block.id

    block.fetch 
      success: =>
        new ConnectView
          el: $connectContainer
          block: block