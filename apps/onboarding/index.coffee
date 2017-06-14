express = require 'express'
routes = require './routes'
ensureLoggedIn = require '../../lib/middleware/ensure_logged_in'

app = module.exports = express()

app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/welcome', ensureLoggedIn, routes.index
app.get '/welcome/:scene', ensureLoggedIn, routes.index
app.get '/welcome/find-friends/callback', ensureLoggedIn, routes.findFriendsCallback
