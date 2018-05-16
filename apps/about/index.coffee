express = require 'express'

app = module.exports = express()

app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/about', (_req, res) ->
  res.render 'index'
app.get '/terms', (_req, res) ->
  res.render 'terms'
app.get '/privacy', (_req, res) ->
  res.render 'privacy'
app.get '/faqs', (_req, res) ->
  res.render 'faqs'
app.get '/pricing', (_req, res) ->
  res.render 'pricing'
app.get '/education', (_req, res) ->
  res.render 'education'
app.get '/experiments', (_req, res) ->
  res.render 'experiments'
app.get '/community-guidelines', (_req, res) ->
  res.render 'community'
