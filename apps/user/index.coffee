{ extend } = require 'underscore'
express = require "express"
routes = require "./routes"
sortMiddleware = require "../../lib/middleware/sort.coffee"

{ default: apolloMiddleware } = require '../../react/apollo/middleware.js'

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"

# API for user channels view
app.get "/api/:username/channels", routes.fetchAuthor, routes.channelsAPI

# All routes below need an author to render
app.get "/:username/blocks", apolloMiddleware, routes.fetchAuthor, sortMiddleware, (req, res, next) ->
  req.query = extend {}, req.query, subject: 'block'
  routes.user req, res, next

app.get "/:username/channels", apolloMiddleware, routes.fetchAuthor, sortMiddleware, (req, res, next) ->
  if res.locals.view_mode is 'list'
    req.query = extend {}, req.query, subject: 'channel'
    routes.user req, res, next
  else
    routes.channels req, res, next

app.get "/:username/index", apolloMiddleware, routes.fetchAuthor, routes.index
app.get "/:username/followers", apolloMiddleware, routes.fetchAuthor, routes.followers
app.get "/:username/following", apolloMiddleware, routes.fetchAuthor, routes.following

# Route to clear a user's cache'
app.get "/:username/update", routes.fetchAuthor, routes.update

# These support legacy routes
app.get "/:username/block/:block_id", routes.user
app.get "/:username/show/:block_id", routes.catchChannel
app.get "/users/:username", routes.redirectUser

# Middleware to determine what type of profile to show when the mode isn't specified
filterMiddleware = (req, res, next) ->
  filter = req.cookies.filter or "all"
  switch filter
    when "all"
      return next()
    when "channels"
      return res.redirect 302, "/#{req.params.username}/channels"
    when "index"
      return res.redirect 302, "/#{req.params.username}/index"
    when "blocks"
      return res.redirect 302, "/#{req.params.username}/blocks"

# Default profile view
app.get "/:username", apolloMiddleware, filterMiddleware, routes.fetchAuthor, sortMiddleware, routes.user, routes.catchChannel
