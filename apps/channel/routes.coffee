{ default: ssr } = require '../../react/apollo/ssr.js'
{ default: CollaboratorsList } = require '../../react/components/CollaboratorsList/index.js'

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
          manage_collaborators
          destroy
          manage
        }
      }
    }
  """

  Promise
    .all [
      channel.fetch(data: auth_token: token)
      channel.related().collaborators.fetch(data: auth_token: token)
      graphQL(token: token, query: canQuery, variables: options)

      req.apollo.render(CollaboratorsList, {
        channel_id: req.params.channel_slug
      })
    ]

    .then ([
      _channel,
      _collaborators,
      { channel: { can } },
      collaboratorsList
    ]) ->
      if channel.get('class') is 'User'
        return res.redirect 301, "/#{channel.get 'slug'}"

      if channel.get('user')?.slug isnt req.params.username
        err = new Error
        err.status = 404
        err.message = 'Not Found'
        return next err

      res.locals.sd.CHANNEL = channel.toJSON()
      res.locals.sd.COLLABORATORS = channel.related().collaborators.toJSON()
      res.locals.sd.BLOCKS = channel.related().blocks.toJSON()
      res.locals.sd.CAN = can
      res.locals.sd.CURRENT_ACTION = 'channel'

      res.render 'index',
        channel: channel
        blocks: channel.related().blocks.models
        collaborators: channel.related().collaborators.models
        author: channel.related().author
        can: can or {}
        collaboratorsList: collaboratorsList

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
      channel.related().collaborators.fetch(data: auth_token: token)
      channel.related().followers.fetch(cache: true)
      graphQL(token: token, query: canQuery, variables: options)
    ]

    .then ([_channel, _collaborators, _followers, { channel: { can }}]) ->
      if channel.get('class') is 'User'
        return res.redirect 301, "/#{channel.get 'slug'}"

      res.locals.sd.CHANNEL = channel.toJSON()
      res.locals.sd.BLOCKS = channel.related().followers.toJSON()
      res.locals.sd.COLLABORATORS = channel.related().collaborators.toJSON()
      res.locals.sd.FOLLOWERS = channel.related().followers.toJSON()
      res.locals.sd.CAN = can

      res.render 'index',
        channel: channel
        blocks: channel.related().followers.models # TODO: Odd naming
        collaborators: channel.related().collaborators.models
        author: channel.related().author
        followers: true
        can: can
        # TODO: Consolidate these routes
        collaboratorsList:
          state: {}

    .catch next
