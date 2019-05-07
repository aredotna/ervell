express = require "express"
routes = require "./routes"

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"
app.get "/explore/feed/rss", routes.exploreRSS
app.get "/blog/feed/rss", routes.blogRSS
app.get "/:username/feed/rss", routes.userRSS
app.get "/:username/:channel_slug/feed/rss", routes.channelRSS