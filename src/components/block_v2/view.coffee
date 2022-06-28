Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Block = require '../../models/block.coffee'
analytics = require '../../lib/analytics.coffee'
FollowButtonView = require '../follow_button/client/follow_button_view.coffee'

module.exports = class BlockView extends Backbone.View
  events:
    'click .js-source' : 'openSource'

  initialize: ({ @block }) -> #

  openSource: (e) ->
    analytics.track.click "Block source opened"

    url = @block.kind.source_url or @block.kind.file_url

    e.preventDefault()
    e.stopImmediatePropagation()

    analytics.trackOutboundLink url

    window.open url,'_blank'

    false

  getModel: ->
    model = new Block id: @block.id

    if @block.kind.__typename is 'Channel'
      model.url = "#{API_URL}/channels/#{@block.id}/thumb"
    else
      model.url = "#{API_URL}/blocks/#{@block.id}"

    model

  renderFollowButton: ->
    model = @getModel()
    model.fetch
      success: =>
        new FollowButtonView
          el: @$('.js-follow')
          model: model
          showTitle: false
