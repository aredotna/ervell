express = require 'express'
routes = require './routes'
middleware = require './middleware'
redirectTo = require '../../lib/middleware/redirect_to'

app = module.exports = express()

app
  .set 'views', "#{__dirname}/templates"
  .set 'view engine', 'jade'

app
  # TODO: None of these paths make any kind of sense (snake_case;
  # language: "sign up" vs "join"). Generate new routes and redirect to old.
  .get '/sign_up', routes.sign_up
  .get '/log_in', routes.log_in
  .get '/forgot', routes.forgot
  .get '/reset/:token', routes.reset
  .get '/me/sign_out', middleware.logout, redirectTo
  .get '/confirm/:token', middleware.confirm, redirectTo
  .get '/me/refresh', routes.refresh
  .get '/confirm/expired', routes.expired
