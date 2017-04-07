express = require 'express'
routes = require './routes'
ensureLoggedIn = require '../../lib/middleware/ensure_logged_in'

app = module.exports = express()

app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

tabs = [
  'general'
  'notifications'
  'billing'
]

validateTab = (req, res, next) ->
  if req.params.tab in tabs then next() else res.redirect('/settings')

app.get '/settings', ensureLoggedIn, routes.index
app.get '/settings/:tab', validateTab, ensureLoggedIn, routes.index
