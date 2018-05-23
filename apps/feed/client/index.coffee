# React requires
{ mountWithApolloProvider } = require '../../../react/apollo/index.js'
{ default: HomeComponent } = require '../../../react/components/Home/index.js'

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

  # Legacy setup
  switch FEED_TYPE
    when 'primary'
      initializeFeed($('.feed-container'))
    when 'notifications'
      initializeNotifications($('.feed-container'))
    when 'explore'
      initializeExplore($('.explore-contents'))
