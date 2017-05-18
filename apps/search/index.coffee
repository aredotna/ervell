#
# /search/:query
#

express = require "express"
routes = require "./routes"

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"

app.get "/search/:query", routes.search
app.get "/search/:query/channels", (req, res, next) ->
  req.query = {}
  req.query.subject = 'channels'
  routes.search req, res, next
app.get "/search/:query/blocks", (req, res, next) ->
  req.query = {}
  req.query.subject = 'blocks'
  routes.search req, res, next
app.get "/search/:query/users", (req, res, next) ->
  req.query = {}
  req.query.subject = 'users'
  routes.search req, res, next
app.get "/search/:query/block/:block_id", routes.search