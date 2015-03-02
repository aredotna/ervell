#
# /:username -- a user's profile
#

express = require "express"
routes = require "./routes"
auth = require '../../lib/middleware/auth'

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"
app.get "/:username", auth, routes.user
app.get "/:username/channels", auth, (req, res, next) ->
  req.query = {}
  req.query.subject = 'channel'
  routes.user req, res, next
app.get "/:username/blocks", auth, (req, res, next) ->
  req.query = {}
  req.query.subject = 'block'
  routes.user req, res, next
app.get "/:username/followers", auth, routes.followers
app.get "/:username/following", auth, routes.following
app.get "/:username/block/:block_id", auth, routes.user