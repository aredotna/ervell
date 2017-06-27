_ = require "underscore"
express = require "express"
routes = require "./routes"

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"

homePathMiddleware = (req, res, next) -> 
  return next() unless req.user
  
  path = req.user.get('home_path') 
  return res.redirect 302, path unless path is "/" or !path
  
  next()

app.get "/", homePathMiddleware, routes.index

app.get "/feed", routes.index
app.get "/notifications", routes.notifications
app.get "/explore", routes.explore
app.get "/explore/channels", (req, res, next) ->
  req.query = _.extend req.query, subject: 'channel'
  routes.explore req, res, next
app.get "/explore/blocks", (req, res, next) ->
  req.query = _.extend req.query, subject: 'block'
  routes.explore req, res, next
