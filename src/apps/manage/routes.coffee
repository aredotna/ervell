ManageBlocks = require "../../collections/manage_blocks"

@manage = (req, res, next) ->

  res.redirect '/' unless req.user

  blocks = new ManageBlocks null,
    user_slug: req.user.get('slug')
    per: 50
    'filter[type]': 'channel'

  res.locals.sd.USER = req.user.toJSON()

  blocks.fetch
    data:
      auth_token: req.user?.get('authentication_token')
    success: ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.render 'index',
        blocks: blocks.models
        author: req.user
    error: (m, err) -> next err
