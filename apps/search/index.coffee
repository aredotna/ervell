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
app.get "/search/:query/block/:block_id", auth, routes.search