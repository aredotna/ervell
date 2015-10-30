# Lightbox / Single-page block view

express = require "express"
routes = require "./routes"
auth = require '../../lib/middleware/auth'

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"

app.get "/block/:block_id", auth, routes.block
