express = require "express"
routes = require "./routes"
bodyParser = require "body-parser"
multer = require 'multer'

storage = multer.memoryStorage()
upload = multer({ storage: storage })

app = module.exports = express()
app.set "views", __dirname + "/templates"
app.set "view engine", "jade"
app.get "/import", routes.import
app.get "/import/upload", routes.upload
app.post "/import/upload",  upload.single('bookmarks'), routes.parseBookmarks
