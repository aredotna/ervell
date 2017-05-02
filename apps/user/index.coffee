#
# /:username -- a user's profile
#

_ = require 'underscore'
express = require "express"
routes = require "./routes"
auth = require '../../lib/middleware/auth'

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"
app.get "/api/:username/profile", routes.profileAPI
app.get "/:username", auth, routes.fetchAuthor, routes.user, routes.catchChannel
app.get "/:username/index", auth, routes.fetchAuthor, routes.userChannelsByAlpha, routes.catchChannel
app.get "/:username/profile", auth, routes.fetchAuthor, routes.profile, routes.catchChannel
app.get "/:username/channels", auth, routes.fetchAuthor, (req, res, next) ->
  req.query = _.extend req.query, subject: 'channel'
  routes.user req, res, next
app.get "/:username/blocks", auth, routes.fetchAuthor, (req, res, next) ->
  req.query = _.extend req.query, subject: 'block'
  routes.user req, res, next
app.get "/:username/followers", auth, routes.fetchAuthor, routes.followers
app.get "/:username/following", auth, routes.fetchAuthor, routes.following
app.get "/:username/update", auth, routes.fetchAuthor, routes.update
app.get "/:username/block/:block_id", auth, routes.fetchAuthor, routes.user
app.get "/:username/show/:block_id", auth, routes.catchChannel
app.get "/users/:username", auth, routes.redirectUser