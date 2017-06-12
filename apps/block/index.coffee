# Lightbox / Single-page block view

express = require "express"
routes = require "./routes"

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"

app.get "/block/:block_id", routes.block
app.get "/block/:block_id/:tab", routes.block
