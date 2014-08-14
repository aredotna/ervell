#
# Handles all root requests
#
# TODO: If logged in, show feed, if not show landing
#
#

express = require "express"
routes = require "./routes"

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"
app.get "/", routes.index