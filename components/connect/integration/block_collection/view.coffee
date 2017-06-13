{ invoke } = require 'underscore'
Backbone = require 'backbone'
ConnectView = require '../../client/index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class BlockCollectionConnectIntegrationView extends Backbone.View
  className: 'BlockCollectionConnectIntegration'

  events:
    'click': 'preventDefault' 
    'click .js-close': 'remove'

  preventDefault: (e) ->
    # Prevent clicks from propagating down to the Block link
    e.stopPropagation()
    e.preventDefault()

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
