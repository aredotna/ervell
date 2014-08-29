#
# Routes file that exports route handlers for ease of testing.
#

User = require "../../models/user"
Blocks = require "../../collections/blocks"
auth = require '../../lib/middleware/auth'

@user = (req, res, next) ->

  auth req

  user = new User
    id: req.params.username

  user.fetch
    success: ->
      res.locals.sd.USER = user.toJSON()
      res.render "index", author: user
    error: (m, err) -> next err