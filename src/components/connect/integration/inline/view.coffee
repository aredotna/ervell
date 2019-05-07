{ invoke } = require 'underscore'
Backbone = require 'backbone'
ConnectView = require '../../client/index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class InlineConnectIntegrationView extends Backbone.View
  className: 'InlineConnectIntegration'

  events:
    'click .js-close': 'remove'

  render: ->
    invoke @subViews, 'remove'

    @subViews = [
      connectView = ConnectView @model
    ]

    @$el
      .html template()
      .find('.js-render')
        .html connectView.render().$el

    this

  remove: ->
    @trigger 'remove'
    invoke @subViews, 'remove'
    super
