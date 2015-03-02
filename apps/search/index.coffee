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
  console.log 'only channels'
  req.query = {}
  req.query.subject = 'channel'
  routes.search req, res, next
app.get "/search/:query/blocks", auth, (req, res, next) ->
  req.query = {}
  req.query.subject = 'block'
  routes.search req, res, next
app.get "/search/:query/block/:block_id", auth, routes.search