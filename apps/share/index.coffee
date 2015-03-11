#
# The express app for the Share app.
#
# The share id is used to retrieve the channel and authenticate the request.
#

express = require "express"
routes = require "./routes"
Backbone = require "backbone"
Backbone.sync = require "backbone-super-sync"
_ = require 'underscore'

auth = (p_req, res, next) ->

  Backbone.sync.editRequest = (req) ->
    req.set 'x-share-token': p_req.params.share_token

  res.locals._ = _

  next()

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"
app.get "/share/:share_token", auth, routes.channel