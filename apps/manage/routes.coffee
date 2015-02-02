UserBlocks = require "../../collections/user_blocks"

@manage = (req, res, next) ->

  blocks = new UserBlocks null,
    user_slug: req.user.get('slug')
    per: 50,
    'filter[type]': 'channel'

  blocks.fetch
    success: ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.render 'index', blocks: blocks.models
    error: (m, err) -> next err
