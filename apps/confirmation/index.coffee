express = require 'express'
routes = require './routes'
middleware = require './middleware'

app = module.exports = express()

app
  .set 'views', "#{__dirname}/templates"
  .set 'view engine', 'jade'

app
  .get '/confirm/expired', routes.expired
  .get '/confirm/:token',
    middleware.confirm,
    routes.confirmed,
    routes.unconfirmed
