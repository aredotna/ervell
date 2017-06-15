express = require 'express'
ensureLoggedIn = require '../../lib/middleware/ensure_logged_in'

app = module.exports = express.Router()

app.get '/reload_app_example', ensureLoggedIn, (req, res, next) ->
  res.send('change me and reload browser')
