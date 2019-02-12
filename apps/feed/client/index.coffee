# TODO: Write JavaScript
# React requires
qs = require 'qs'
{ mountWithApolloProvider } = require '../../../react/apollo/index.js'
{ default: NoFollowingMessage } = require '../../../react/components/Feed/components/NoFollowingMessage/index.js'

# Legacy requires
{ FEED_TYPE } = require('sharify').data
{ default: initializeNotifications } = require './notifications.js'
{ default: initializeFeed } = require './feed.js'

module.exports = ->
  if ($noFollowingComponent = $('.js-no-following')).length
    mountWithApolloProvider(NoFollowingMessage, { }, $noFollowingComponent)

  # Legacy setup
  switch FEED_TYPE
    when 'primary'
      initializeFeed($('.js-feed'))
    when 'notifications'
      initializeNotifications($('.js-feed'))
