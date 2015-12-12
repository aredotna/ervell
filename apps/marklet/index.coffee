#
# Save routes
#

express = require "express"
subdomain = require 'express-subdomain'
routes = require "./routes"

app = module.exports = express()
router = express.Router()

app.set "views", __dirname + "/templates"
app.set "view engine", "jade"

app.get '/save/:content', routes.save

# serves loader file
router.get "/loader.js", (req, res, next) ->
  options =
    root: __dirname + '/public/'
    dotfiles: 'deny'
    headers:
      'x-timestamp': Date.now(),
      'x-sent': true

  res.sendFile 'loader.js', options, (err) ->
    if err
      console.log(err)
      res.status(err.status).end()
    else
      console.log('Sent:')

app.use subdomain('marklet-beta', router)
