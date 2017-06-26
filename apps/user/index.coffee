#
# /:username -- a user's profile
#

_ = require 'underscore'
express = require "express"
routes = require "./routes"
sortMiddleware = require "../../lib/middleware/sort.coffee"

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"

app.get "/api/:username/channels", routes.fetchAuthor, routes.channelsAPI

# All routes below need an author to render
app.get "/:username/blocks", routes.fetchAuthor, sortMiddleware, (req, res, next) ->
  req.query = _.extend req.query, subject: 'block'
  routes.user req, res, next

app.get "/:username/channels", routes.fetchAuthor, sortMiddleware, (req, res, next) ->
  if res.locals.view_mode is 'list'
    req.query = _.extend req.query, subject: 'channel'
    routes.user req, res, next
  else
    routes.channels req, res, next

app.get "/:username/index", routes.fetchAuthor, routes.index
app.get "/:username/followers", routes.fetchAuthor, routes.followers
app.get "/:username/following", routes.fetchAuthor, routes.following

# Route to clear a user's cache'
app.get "/:username/update", routes.update

# These support legacy routes
app.get "/:username/block/:block_id", routes.user
app.get "/:username/show/:block_id", routes.catchChannel
app.get "/users/:username", routes.redirectUser

# Default profile view
app.get "/:username", routes.fetchAuthor, sortMiddleware, routes.user, routes.catchChannel
