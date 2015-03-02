#
# /search/:query
#

express = require "express"
routes = require "./routes"
auth = require '../../lib/middleware/auth'

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"
app.get "/search/:query", auth, routes.search
app.get "/search/:query/channels", auth, (req, res, next) ->
  req.query = {}
  req.query.subject = 'channels'
  routes.search req, res, next
app.get "/search/:query/blocks", auth, (req, res, next) ->
  req.query = {}
  req.query.subject = 'blocks'
  routes.search req, res, next
app.get "/search/:query/users", auth, (req, res, next) ->
  req.query = {}
  req.query.subject = 'users'
  routes.search req, res, next
app.get "/search/:query/block/:block_id", auth, routes.search