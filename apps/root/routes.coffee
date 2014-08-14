#
# Routes file that exports route handlers for ease of testing.
#

Channel = require "../../models/channel"
Blocks = require "../../collections/blocks"

@index = (req, res, next) ->
  # to do: check for login! for now just render the splash page
  res.render "index"