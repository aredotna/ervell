#
# Save routes
#

express = require "express"
subdomain = require 'express-subdomain'
routes = require "./routes"

app = module.exports = express()
router = express.Router()

app.set "views", __dirname + "/templates"
app.set "view engine", "jade"

# serves loader file
app.use "/", express.static(__dirname + '/public')

router.get '/save/:content', routes.save

app.use subdomain('marklet', router)
