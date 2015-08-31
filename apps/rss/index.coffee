express = require "express"
routes = require "./routes"
auth = require '../../lib/middleware/auth'

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"
app.get "/:username/feed/rss", auth, routes.userRSS
app.get "/:username/:channel_slug/feed/rss", auth, routes.channelRSS