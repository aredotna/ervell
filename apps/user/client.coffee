#
# The client-side code for a User Profile
#

Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
scrollFrame = require 'scroll-frame'
sd = require("sharify").data
mediator = require '../../lib/mediator.coffee'
User = require "../../models/user.coffee"
UserBlocks = require '../../collections/user_blocks.coffee'
FollowBlocks = require '../../collections/follow_blocks.coffee'
InfiniteView = require '../../components/pagination/infinite_view.coffee'
Filter = require '../../components/filter/index.coffee'
PathView = require '../../components/path/client/path_view.coffee'
MetaEditableAttributeView = require '../../components/editable_attribute/client/meta_editable_attribute_view.coffee'
UserBlockCollectionView = require '../../components/block_collection/client/user_block_collection_view.coffee'
setupBlockCollection = require '../../components/blocks/container/client/index.coffee'

module.exports.init = ->
  current_user = mediator.shared.current_user
  user = new User sd.USER

  unless sd.CURRENT_PATH.indexOf('/index') > -1
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
        sort: sd.SORT || ''
        seed: sd.SEED || ''

    options =
      model: user
      $el: $('.profile-contents')
      collection: blocks

    _.extend(options, { subject: sd.SUBJECT }) if sd.SUBJECT
    _.extend(options, { sort: sd.SORT }) if sd.SORT

    setupBlockCollection options

    blocks.on 'remove', ->
      unless ( blocks.any (block) -> block.get('class') is 'Tip' )
        mediator.shared.current_user.save show_tour: false

  new PathView
    el: $('section.path--header')
    model: user

  new MetaEditableAttributeView
    model: user
    el: $("#metadata--about .metadata__content")
    _attribute: 'description'
    _kind: 'markdown'
    wait: true

  user.on 'edit:success', ->
    $.ajax
      method: 'GET'
      url: "#{user.href()}/update"
