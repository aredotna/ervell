express = require 'express'
routes = require './routes'

app = module.exports = express()

app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# TODO: Check if logged in
app.get '/welcome', routes.index
app.get '/welcome/:scene', routes.index
app.get '/welcome/find-friends/callback', routes.findFriendsCallback
