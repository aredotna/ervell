express = require 'express'
routes = require './routes'

app = module.exports = express()

app.get '/go', routes.redirect # TODO: Not in this controller
app.get '/cache/flushall', routes.flushall # TODO: Not in this controller
