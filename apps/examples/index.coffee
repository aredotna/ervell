express = require 'express'

app = module.exports = express()

app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/examples', (_req, res) ->
  res.render 'index'