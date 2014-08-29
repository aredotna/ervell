express = require 'express'
arenaPassport = require '../'
Backbone = require 'backbone'
sharify = require 'sharify'
fs = require 'fs'
config = require '../config.coffee'
_ = require 'underscore'
backboneSuperSync = require 'backbone-super-sync'

# CurrentUser class
class CurrentUser extends Backbone.Model
  url: -> "http://staging.are.na/v2/accounts"

  sync: (method, model, options = {}) ->
    options.data ?= {}
    options.data.auth_token = @get 'access_token'
    super

  parse: (response) ->
    response.user

app = module.exports = express()

# Generic setup
sharify.data = config
app.use sharify
Backbone.sync = backboneSuperSync
app.set 'views', __dirname
app.set 'view engine', 'jade'
app.use express.bodyParser()
app.use express.cookieParser('foobar')
app.use express.cookieSession()
app.use express.static __dirname + '/public'

# Setup Artsy Passport
app.use arenaPassport _.extend config,
  CurrentUser: CurrentUser
{ loginPath, signupPath } = arenaPassport.options

# Artsy passport route handlers
app.post loginPath, (req, res) ->
  res.redirect '/'
app.post signupPath, (req, res) ->
  res.redirect '/personalize'

# App specific routes that render a login/signup form and logged in view
app.get '/', (req, res) ->
  if req.user? then res.render 'loggedin' else res.render 'login'
app.get '/logout', (req, res) ->
  req.logout()
  res.redirect '/'

return unless module is require.main
app.listen 4000, -> console.log "Example listening on 4000"