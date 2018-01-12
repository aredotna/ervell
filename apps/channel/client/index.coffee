{ CHANNEL, BLOCKS, API_URL, FOLLOWERS, FOLLOWING } = require('sharify').data
mediator = require '../../../lib/mediator.coffee'
{ initChannelPath } = require './channel_path_view.coffee'
ChannelView = require './channel_view.coffee'
setupBlockCollection = require '../../../components/blocks/container/client/index.coffee'
ChannelBlocks = require '../../../collections/channel_blocks.coffee'
Block = require '../../../models/block.coffee'
Channel = require '../../../models/channel.coffee'
addBlock = require '../../../components/add_block/client/index.coffee'
initShare = require '../components/share/index.coffee'
initManageCollaborators = require '../components/manage_collaborators/index.coffee'

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

  initChannelPath(channel)
  initShare()
  initManageCollaborators()

  channelView = new ChannelView
    el: $('.js-channel')
    channel: channel
    blocks: blocks
    blockCollectionView: view
    resultsCollection: resultsCollection

  return unless ($addBlock = $('.js-add-block')).length

  integration = addBlock
    $el: $addBlock
    collection: blocks

  integration.init()
  resultsCollection?.on 'reset', integration.reset
