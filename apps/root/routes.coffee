#
# Routes file that exports route handlers for ease of testing.
#

Blocks = require "../../collections/blocks"

@index = (req, res, next) ->
  # to do: check for login! for now just render the splash page

  res.render 'index'

  # blocks = new Blocks null,
  #   channel_slug: 'arena-influences'

  # blocks.fetch
  #   success: ->
  #     # res.locals.sd.USERNAME = req.params.username
  #     res.locals.sd.BLOCKS = blocks.toJSON()

  #     res.render 'index', blocks: blocks.models
  #   error: (m, err) -> next err.text
