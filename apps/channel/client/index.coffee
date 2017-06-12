{ CHANNEL, BLOCKS, API_URL, FOLLOWERS, FOLLOWING } = require('sharify').data
mediator = require '../../../lib/mediator.coffee'
{ initChannelPath } = require './channel_path_view.coffee'
ChannelView = require './channel_view.coffee'
setupBlockCollection = require '../../../components/blocks/container/client/index.coffee'
ChannelBlocks = require '../../../collections/channel_blocks.coffee'
Block = require '../../../models/block.coffee'
Channel = require '../../../models/channel.coffee'
addBlockChannelServerRenderedIntegration = require '../../../components/add_block/integrations/channel_server_rendered.coffee'
addBlockChannelClientRenderedIntegration = require '../../../components/add_block/integrations/channel_client_rendered.coffee'

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

  # Add Block initialization:
  if current_user.canAddToChannel(channel) and not (FOLLOWERS? or FOLLOWING?)
    integration = addBlockChannelServerRenderedIntegration
      $el: $('.js-add-block')
      collection: blocks

    integration.init()
    resultsCollection?.on 'reset', integration.reset

  mediator.once 'collaborators:fetched', (collaborators) ->
    return if $('.js-add-block').length # Already rendered
    return unless mediator.shared.current_user.id in collaborators.pluck 'id'

    integration = addBlockChannelClientRenderedIntegration
      $el: $('.js-block-collection')
      collection: blocks

    integration.init()
    resultsCollection?.on 'reset', integration.reset
