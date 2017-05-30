_ = require "underscore"
express = require "express"
routes = require "./routes"

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"

app.get "/", routes.index

app.get "/notifications", routes.notifications

app.get "/explore", routes.explore
app.get "/explore/channels", (req, res, next) ->
  req.query = _.extend req.query, subject: 'channel'
  routes.explore req, res, next
app.get "/explore/blocks", (req, res, next) ->
  req.query = _.extend req.query, subject: 'block'
  routes.explore req, res, next
