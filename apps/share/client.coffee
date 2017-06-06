Backbone = require "backbone"
Backbone.$ = $
Channel = require '../../models/channel.coffee'
ChannelBlocks = require '../../collections/channel_blocks.coffee'
setupBlockCollection = require '../../components/blocks/container/client/index.coffee'

module.exports.init = ->
  if sd.SHARE_TOKEN
    $.ajaxSetup
      beforeSend: (xhr)->
        xhr.setRequestHeader 'X-SHARE-TOKEN', sd.SHARE_TOKEN

    channel = new Channel sd.CHANNEL
    blocks = new ChannelBlocks sd.BLOCKS, channel_slug: sd.CHANNEL.slug

    setupBlockCollection
      $el: $('.js-channel-contents')
      collection: blocks
      mode: 'skeleton'

