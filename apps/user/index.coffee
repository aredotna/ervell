#
# /:username -- a user's profile
#

_ = require 'underscore'
express = require "express"
routes = require "./routes"

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"

app.get "/api/:username/channels", routes.profileAPI

# All routes below need an author to render
app.use routes.fetchAuthor
app.get "/:username", routes.user, routes.catchChannel
app.get "/:username/channels", routes.profile, routes.catchChannel
app.get "/:username/blocks", (req, res, next) ->
  req.query = _.extend req.query, subject: 'block'
  routes.user req, res, next

app.get "/:username/index", routes.userChannelsByAlpha
app.get "/:username/followers", routes.followers
app.get "/:username/following", routes.following

# Route to clear a user's cache'
app.get "/:username/update", routes.update

# These support legacy routes
app.get "/:username/block/:block_id", routes.user
app.get "/:username/show/:block_id", routes.catchChannel
app.get "/users/:username", routes.redirectUser