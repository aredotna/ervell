express = require 'express'
config = require '../../config'
reloadable = require '../../lib/reloadable'

app = module.exports = express()

app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

if config.NODE_ENV is 'development'
  reloadable app, (req, res, next) ->
    require('./server')(req, res, next)
else
  app.use(require('./server'))
