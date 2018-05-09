{ default: ssr } = require '../../react/apollo/ssr.js'
{ default: ChannelComponent } = require '../../react/components/Channel/index.js'

ChannelModel = require '../../models/channel'

@channel = (req, res, next) ->
  id = req.params.channel_slug
  token = req.user?.get('authentication_token')
  channelModel = new ChannelModel id: id

  Promise.all([
    req.apollo.render(ChannelComponent, { id: id })
    channelModel.fetch(data: auth_token: token)
  ])
    .then ([channelComponent, _channelModelResponse]) ->
      if channelModel.get('class') is 'User'
        return res.redirect 301, "/#{channelModel.get('slug')}"

      res.locals.sd.CURRENT_ACTION = 'channel'
      res.locals.sd.CHANNEL = CHANNEL = channelModel.toJSON()
      res.locals.sd.CAN = CHANNEL.can
      res.locals.sd.BLOCKS = channelModel.related().blocks.toJSON()

      res.render 'index',
        channel: channelModel
        author: channelModel.related().author
        blocks: channelModel.related().blocks.models
        can: CHANNEL.can
        channelComponent: channelComponent

    .catch(next)

@embed = (req, res, next) ->
  token = req.user?.get('authentication_token')
  channel = new ChannelModel id: req.params.channel_slug
  channel.url = "#{channel.urlRoot()}?per=7&direction=desc"

  channel
    .fetch cache: true, data: auth_token: token
    .then ->
      res.locals.sd.CHANNEL = channel.toJSON()
      res.locals.sd.BLOCKS = channel.related().blocks.toJSON()

      res.render 'embed',
        channel: channel
        blocks: channel.related().blocks.models
        author: channel.related().author
        isEmbedded: true

    .catch next

@followers = (req, res, next) ->
  id = req.params.channel_slug
  token = req.user?.get('authentication_token')
  channelModel = new ChannelModel id: id

  Promise.all([
    req.apollo.render(ChannelComponent, { id: id })
    channelModel.fetch(data: auth_token: token)
    channelModel.related().followers.fetch(cache: true)
  ])
    .then ([channelComponent, _channelModelResponse, _channelFollowersResponse]) ->
      if channelModel.get('class') is 'User'
        return res.redirect 301, "/#{channelModel.get('slug')}"

      res.locals.sd.CURRENT_ACTION = 'channel_followers'
      res.locals.sd.CHANNEL = CHANNEL = channelModel.toJSON()
      res.locals.sd.CAN = CAN = { add_to: false, manage: false }
      res.locals.sd.BLOCKS = channelModel.related().followers.toJSON()

      res.render 'index',
        followers: true
        channel: channelModel
        author: channelModel.related().author
        blocks: channelModel.related().followers.models # TODO: Odd naming
        can: CAN
        channelComponent: channelComponent

    .catch next
