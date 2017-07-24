Channel = require '../../models/channel'
graphQL = require '../../lib/graphql'

@channel = (req, res, next) ->
  token = req.user?.get('authentication_token')
  options = id: req.params.channel_slug
  channel = new Channel options

  canQuery = """
    query channel_can($id: ID!) {
      channel(id: $id) {
        can {
          add_to
          update
          mute
          follow
        }
      }
    }
  """

  Promise
    .all [
      channel.fetch data: auth_token: token
      graphQL token: token, query: canQuery, variables: options
    ]

    .then ([_channel, { channel: { can }}]) ->
      if channel.get('class') is 'User'
        return res.redirect 301, "/#{channel.get 'slug'}"

      res.locals.sd.CHANNEL = channel.toJSON()
      res.locals.sd.BLOCKS = channel.related().blocks.toJSON()
      res.locals.sd.CAN = can

      res.render 'index',
        channel: channel
        blocks: channel.related().blocks.models
        author: channel.related().author
        can: can

    .catch next

@embed = (req, res, next) ->
  token = req.user?.get('authentication_token')
  channel = new Channel id: req.params.channel_slug
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
  token = req.user?.get('authentication_token')
  options = id: req.params.channel_slug
  channel = new Channel options

  canQuery = """
    query channel_can($id: ID!) {
      channel(id: $id) {
        can {
          follow
          mute
        }
      }
    }
  """

  Promise
    .all [
      channel.fetch()
      channel.related().followers.fetch cache: true
      graphQL token: token, query: canQuery, variables: options
    ]

    .then ([_channel, _followers, { channel: { can }}]) ->
      if channel.get('class') is 'User'
        return res.redirect 301, "/#{channel.get 'slug'}"

      res.locals.sd.CHANNEL = channel.toJSON()
      res.locals.sd.BLOCKS = channel.related().followers.toJSON()
      res.locals.sd.FOLLOWERS = channel.related().followers.toJSON()
      res.locals.sd.CAN = can

      res.render 'index',
        channel: channel
        blocks: channel.related().followers.models # TODO: Odd naming
        author: channel.related().author
        followers: true
        can: can

    .catch next
