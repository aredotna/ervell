Backbone = require 'backbone'
{ mountWithApolloProvider } = require '../../../react/apollo/index.js'
{ default: FollowButton } = require '../../../react/components/FollowButton'

module.exports = class ExampleChannelView extends Backbone.View

  initialize: ->
    console.log('initializing', @$el.data('id'))
    @initializeFollowButton()

  initializeFollowButton: ->
    mountWithApolloProvider FollowButton, { id: @$el.data('id'), type: 'CHANNEL' }, $('.js-example-channel-follow')