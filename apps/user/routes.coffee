#
# Routes file that exports route handlers for ease of testing.
#

User = require "../../models/user"
Blocks = require "../../collections/blocks"

@user = (req, res, next) ->
  user = new User
    id: req.params.username

  user.fetch
    success: ->
      res.locals.sd.USER = user.toJSON()

      console.log 'user', user
      res.render "index", user: user