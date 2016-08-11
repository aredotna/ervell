#
# /
# (root requests)
#

_ = require "underscore"
express = require "express"
routes = require "./routes"
auth = require '../../lib/middleware/auth'

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"
app.get "/", auth, routes.index
app.get "/notifications", auth, routes.notifications
app.get "/explore", auth, routes.explore
app.get "/explore/channels", auth, (req, res, next) ->
  req.query = _.extend req.query, subject: 'channel'
  routes.explore req, res, next
app.get "/explore/blocks", auth, (req, res, next) ->
  req.query = _.extend req.query, subject: 'block'
  routes.explore req, res, next
