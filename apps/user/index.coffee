#
# The express app for the "commits" app.
#
# Simply exports the express instance to be mounted into the project,
# and loads the routes.
#

express = require "express"
routes = require "./routes"
auth = require '../../lib/middleware/auth'

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"
app.get "/:username", auth, routes.user