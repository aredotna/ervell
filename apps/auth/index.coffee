#
# Auth routes
#

express = require "express"
routes = require "./routes"

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"

# Log out
app.get '/me/sign_out', routes.logout, routes.redirectBack