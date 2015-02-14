#
# The express app for the "about" app.
#

express = require "express"
routes = require "./routes"

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"
app.get "/about", routes.home
app.get "/about/:page", routes.page
app.get "/tools", (req, res)-> res.render 'tools'