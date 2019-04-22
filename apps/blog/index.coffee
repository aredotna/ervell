express = require 'express'
routes = require './routes'

app = module.exports = express()

app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/blog', routes.index
app.get '/blog/', routes.index
app.get '/blog/the-north-face', routes.theNorthFace
app.get '/blog/:slug', routes.show
app.get '/blog/**/:slug.html', routes.redirectOldUrls
