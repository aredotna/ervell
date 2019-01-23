# TODO: Write JavaScript
# React requires
qs = require 'qs'
{ mountWithApolloProvider } = require '../../../react/apollo/index.js'
{ default: EmptyConnectTwitter } = require '../../../react/pages/feed/components/EmptyConnectTwitter/index.js'
{ default: NoFollowingMessage } = require '../../../react/pages/feed/components/NoFollowingMessage/index.js'

# Legacy requires
{ FEED_TYPE } = require('sharify').data
{ default: initializeNotifications } = require './notifications.js'
{ default: initializeFeed } = require './feed.js'

module.exports = ->
  if ($emptyComponent = $('.js-empty-feed')).length
    return mountWithApolloProvider(EmptyConnectTwitter, null, $emptyComponent)

  if ($noFollowingComponent = $('.js-no-following')).length
    mountWithApolloProvider(NoFollowingMessage, { }, $noFollowingComponent)

  # Legacy setup
  switch FEED_TYPE
    when 'primary'
      initializeFeed($('.js-feed'))
    when 'notifications'
      initializeNotifications($('.js-feed'))
