# React requires
{ USER, MODE, SORT } = require('sharify').data
{ mountWithApolloProvider } = require '../../../react/apollo/index.js'
{ default: ProfileComponent } = require '../../../react/components/Profile/index.js'

# Legacy requires
Backbone = require 'backbone'
Backbone.$ = $
_ = require 'underscore'
{ USER, CURRENT_PATH, FOLLOWERS, FOLLOWING, BLOCKS, SUBJECT, SORT, SEED } = require('sharify').data
User = require '../../../models/user.coffee'
initTips = require '../../../components/tips/index.coffee'
UserBlocks = require '../../../collections/user_blocks.coffee'
FollowBlocks = require '../../../collections/follow_blocks.coffee'
setupBlockCollection = require '../../../components/blocks/container/client/index.coffee'
setupChannelsView = require '../components/channels/index.coffee'

module.exports = ->
  # Sets up React component for header
  if ($profileComponent = $('.js-profile-component')).length
    mountWithApolloProvider(ProfileComponent, {
      id: USER.slug, mode: MODE, sort: SORT,
    }, $profileComponent)

  # Legacy setup
  user = new User USER

  initTips()

  # "All" / Blocks
  if /^\/(\w|-)+(\/blocks)?$/.test(CURRENT_PATH)
    collection = new UserBlocks(BLOCKS, {
      user_slug: USER.slug
      subject: SUBJECT
      sort: SORT or ''
      seed: SEED or ''
    })

    setupBlockCollection({
      model: user
      $el: $('.profile-contents')
      collection: collection
    })

  # Channels
  else if /\/channels$/.test(CURRENT_PATH)
    setupChannelsView()

  # Followers / Following
  else if /\/follow(ers|ing)$/.test(CURRENT_PATH)
    collection = new FollowBlocks(BLOCKS, {
      object_id: USER.id
      object_type: 'users'
      suffix: if FOLLOWING then 'ing' else 'ers'
    })

    setupBlockCollection({
      model: user
      $el: $('.profile-contents')
      collection: collection
    })

  # Index
  else if /\/index$/.test(CURRENT_PATH)
    true # Nothing to do
