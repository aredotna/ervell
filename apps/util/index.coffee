express = require 'express'
routes = require './routes'

app = module.exports = express()

app
  .get '/go', routes.redirect
  .get '/cache/flushall', routes.flushall
  .get '/robots.txt', routes.robots
