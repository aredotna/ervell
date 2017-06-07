express = require "express"
routes = require "./routes"

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"
app.get "/tools", routes.tools
app.get "/tools/find-friends", routes.findFriends
app.get "/tools/:tab", routes.tools
app.get "/tools/find-friends/callback", routes.findFriendsCallback