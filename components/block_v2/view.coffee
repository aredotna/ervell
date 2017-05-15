Backbone = require 'backbone'
analytics = require '../../lib/analytics.coffee'

module.exports = class BlockView extends Backbone.View

  events: 
    'click .js-source' : 'openSource'

  initialize: ({ @block }) ->
    # nothing

  openSource: (e) ->
    analytics.track.click "Block source opened"

    url = @block.source.url or @block.kind.file_url

    e.preventDefault()
    e.stopImmediatePropagation()

    analytics.trackOutboundLink url

    window.open url,'_blank'

    false