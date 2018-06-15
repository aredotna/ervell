Backbone = require 'backbone'
{ mountWithApolloProvider } = require '../../../react/apollo/index.js'
{ default: FollowButton } = require '../../../react/components/FollowButton'

module.exports = class ExampleChannelView extends Backbone.View
  initialize: ->
    @initializeFollowButton()

  initializeFollowButton: ->
    props = { id: @$el.data('id'), type: 'CHANNEL' }
    mountNode = @$('.js-example-channel-follow')
    mountWithApolloProvider(FollowButton, props, mountNode)
