# React requires
{ CHANNEL } = require('sharify').data
{ mountWithApolloProvider } = require '../../../v2/apollo/index.js'
{ default: ChannelComponent } = require '../../../v2/components/Channel/index.js'

# Legacy requires
{ CHANNEL, BLOCKS, API_URL } = require('sharify').data
mediator = require '../../../lib/mediator.coffee'
ChannelView = require './channel_view.coffee'
setupBlockCollection = require '../../../components/blocks/container/client/index.coffee'
ChannelBlocks = require '../../../collections/channel_blocks.coffee'
Block = require '../../../models/block.coffee'
Channel = require '../../../models/channel.coffee'
Collaborators = require '../../../collections/collaborators.coffee'
addBlock = require '../../../components/add_block/client/index.coffee'

module.exports = ->
  # Sets up React component
  if ($channelComponent = $('.js-channel-component')).length
    mountWithApolloProvider(ChannelComponent, { id: CHANNEL.slug }, $channelComponent)

  # Sets up legacy views
  { shared: { current_user } } = mediator

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

  return unless ($addBlock = $('.js-add-block')).length

  integration = addBlock
    $el: $addBlock
    collection: blocks

  integration.init()
  resultsCollection?.on 'reset', integration.reset
