#
# Auth routes
#

express = require "express"
routes = require "./routes"
auth = require '../../lib/middleware/auth'

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"

app.get "/log_in", routes.logIn
app.get "/sign_up", routes.signUp
app.get '/me/sign_out', routes.logout, routes.redirectBack
app.get '/me/refresh', auth, routes.refresh
app.get '/go', routes.redirect
app.get '/reset/:token', routes.resetPassword
app.get '/settings', routes.settings
