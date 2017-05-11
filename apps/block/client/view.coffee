{ extend, defer, invoke } = require 'underscore'
LegacyBlockView = require './legacy_view.coffee'
ConnectView = require '../../../components/connect/client/connect_view.coffee'

module.exports = class BlockView extends LegacyBlockView
  subViews: []

  events: extend {}, LegacyBlockView::events,
    'click .js-connect': 'connect'

  connect: (e) ->
    e.preventDefault()

    $el = @$('.block-connect-container')
    $el.addClass 'is-active'

    view = new ConnectView
      el: $el
      block: @model

    @subViews.push view

    defer =>
      $('.new-connection__done-button').get(0).scrollIntoView()

  remove: ->
    invoke @subViews, 'remove'

    super
