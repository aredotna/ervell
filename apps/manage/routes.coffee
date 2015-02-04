ManageBlocks = require "../../collections/manage_blocks"

@manage = (req, res, next) ->

  blocks = new ManageBlocks null,
    user_slug: req.user.get('slug')
    per: 50
    'filter[type]': 'channel'

  res.locals.sd.USER = req.user.toJSON();

  blocks.fetch
    success: ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.render 'index', blocks: blocks.models
    error: (m, err) -> next err
