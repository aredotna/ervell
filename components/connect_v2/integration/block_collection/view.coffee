{ invoke } = require 'underscore'
Backbone = require 'backbone'
ConnectView = require '../../client/index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class BlockCollectionConnectIntegrationView extends Backbone.View
  className: 'BlockCollectionConnectIntegration'

  events:
    'click': (e) -> e.stopPropagation() # Prevent clicks from propagating down to the Block link
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

  remove: (e) ->
    e?.stopPropagation()
    e?.preventDefault()
    
    @trigger 'remove'
    invoke @subViews, 'remove'
    super
