express = require 'express'
routes = require './routes'

app = module.exports = express()

app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/ui', routes.index
app.get '/ui/:page', routes.page
