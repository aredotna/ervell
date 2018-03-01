express = require 'express'
routes = require './routes'

{ default: apolloMiddleware } = require '../../react/apollo/middleware.js'

app = module.exports = express()

app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/:username/:channel_slug', apolloMiddleware, routes.channel
app.get '/:username/:channel_slug/block/:block_id', routes.channel
app.get '/:username/:channel_slug/embed', routes.embed
app.get '/:username/:channel_slug/followers', routes.followers
