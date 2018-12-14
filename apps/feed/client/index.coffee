# React requires
qs = require 'qs'
{ mountWithApolloProvider } = require '../../../react/apollo/index.js'
{ default: HomeComponent } = require '../../../react/components/Home/index.js'
{ default: EmptyConnectTwitter } = require '../../../react/pages/feed/components/EmptyConnectTwitter/index.js'
{ default: NoFollowingMessage } = require '../../../react/pages/feed/components/NoFollowingMessage/index.js'

# Legacy requires
{ FEED_TYPE, SORT, MODE } = require('sharify').data
{ default: initializeNotifications } = require './notifications.js'
{ default: initializeFeed } = require './feed.js'
{ default: initializeExplore } = require './explore.js'

module.exports = ->
  # Sets up React component for header
  if ($homeComponent = $('.js-home-component')).length
    mountWithApolloProvider(HomeComponent, {
      sort: SORT,
      mode: MODE,
    }, $homeComponent)

  if ($emptyComponent = $('.js-empty-feed')).length
    showModal = qs.parse(location.search.replace('?', ''))?.showModal
    return mountWithApolloProvider(EmptyConnectTwitter, { showModal }, $emptyComponent)

  if ($noFollowingComponent = $('.js-no-following')).length
    mountWithApolloProvider(NoFollowingMessage, { }, $noFollowingComponent)

  # Legacy setup
  switch FEED_TYPE
    when 'primary'
      initializeFeed($('.js-feed'))
    when 'notifications'
      initializeNotifications($('.js-feed'))
    when 'explore'
      initializeExplore($('.explore-contents'))
