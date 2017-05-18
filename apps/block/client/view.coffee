{ extend, invoke } = require 'underscore'
LegacyBlockView = require './legacy_view.coffee'
InlineConnectIntegrationView = require '../../../components/connect_v2/integration/inline/view.coffee'

module.exports = class BlockView extends LegacyBlockView
  subViews: []

  events: extend {}, LegacyBlockView::events,
    'click .js-connect': 'connect'

  connect: (e) ->
    e.preventDefault()

    $target = $(e.currentTarget)

    view = new InlineConnectIntegrationView model: @model
    view.once 'remove', -> $target.show()

    $target
      .hide()
      .after view.render().$el

    @subViews.push view

  remove: ->
    invoke @subViews, 'remove'
    super

