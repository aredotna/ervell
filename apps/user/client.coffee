#
# The client-side code for a User Profile
#

Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
scrollFrame = require 'scroll-frame'
sd = require("sharify").data
User = require "../../models/user.coffee"
UserBlocks = require '../../collections/user_blocks.coffee'
FollowBlocks = require '../../collections/follow_blocks.coffee'
InfiniteView = require '../../components/pagination/infinite_view.coffee'
MetaEditableAttributeView = require '../../components/editable_attribute/client/meta_editable_attribute_view.coffee'
UserBlockCollectionView = require '../../components/block_collection/client/user_block_collection_view.coffee'

module.exports.init = ->

  if sd.FOLLOWING || sd.FOLLOWERS
    blocks = new FollowBlocks sd.BLOCKS,
      object_id: sd.USER.id
      object_type: 'users'
      suffix: if sd.FOLLOWING then 'ing' else 'ers'
  else
    blocks = new UserBlocks sd.BLOCKS,
      user_slug: sd.USER.slug

    _.extend blocks.options,
      subject: sd.SUBJECT

  new UserBlockCollectionView
    el: $ ".grid"
    blocks: blocks

  # scrollFrame '.grid__block--channel a'

  new InfiniteView
    context: $ ".grid"
    collection: blocks
    itemSelector: $ ".grid"

  if sd.USER.id is sd.CURRENT_USER.id
    user = new User sd.USER

    new MetaEditableAttributeView
      model: user
      el: $("#metadata--info .metadata__content")
      _attribute: 'description'
      _kind: 'markdown'
      wait: true
