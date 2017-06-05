{ CHANNEL, BLOCKS, API_URL, FOLLOWERS, FOLLOWING } = require('sharify').data
mediator = require '../../../lib/mediator.coffee'
{ initChannelPath } = require './channel_path_view.coffee'
ChannelView = require './channel_view.coffee'
setupBlockCollection = require '../../../components/blocks/container/client/index.coffee'
ChannelBlocks = require '../../../collections/channel_blocks.coffee'
AddBlockView = require '../../../components/add_block/index.coffee'
Block = require '../../../models/block.coffee'
Channel = require '../../../models/channel.coffee'

module.exports = ->
  { current_user } = mediator.shared

  channel = new Channel CHANNEL
  blocks = new ChannelBlocks BLOCKS, channel_slug: CHANNEL.slug
  blocks.url = "#{API_URL}/channels/#{CHANNEL.slug}/blocks"

  { view, resultsCollection } = setupBlockCollection
    $el: $('.js-channel-contents')
    model: channel
    collection: blocks
    channel: channel
    mode: 'skeleton'

  channelView = new ChannelView
    el: $('.js-channel')
    channel: channel
    blocks: blocks
    blockCollectionView: view
    resultsCollection: resultsCollection

  initChannelPath channel

  if current_user.canAddToChannel(channel) and not (FOLLOWERS? or FOLLOWING?)
    addBlockView = AddBlockView $('.js-add-block'), blocks

    resultsCollection?.on 'reset', ->
      addBlockView.undelegateEvents()
      addBlockView = AddBlockView $('.js-add-block'), blocks
