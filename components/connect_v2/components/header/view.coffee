Backbone = require 'backbone'

module.exports = class ConnectHeaderView extends Backbone.View
  className: 'Connect__header'

  render: ->
    @$el.text 'Recent Channels'
    this
