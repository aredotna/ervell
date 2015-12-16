Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
UserBlocks = require '../../../collections/user_blocks.coffee'

connectResultsTemplate = -> require('../templates/connect_results.jade') arguments...

module.exports = class ConnectResultsView extends Backbone.View

  events:
    'tap .new-connection__search-result' : 'toggleConnection'

  initialize: (options) ->
    { @block } = options
    @collection.on "sync add", @render, @

  toggleConnection: (e)=>
    target = $(e.currentTarget)
    id = target.data('id')
    target.toggleClass('is-connected')
    @collection.get(id).set marked: target.hasClass('is-connected')

  render: ->
    @$el.html connectResultsTemplate(blocks: @collection.models)
