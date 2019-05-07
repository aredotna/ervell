sd = require("sharify").data
fs = require "fs"
cheerio = require "cheerio"
Backbone = require "backbone"

parseBookmarks = (data) ->
  $ = cheerio.load data
  $('a').map((i, el) ->
    unless $(this).attr('href').indexOf('javascript:') > -1
      $el = $(this)

      return {
        id: i
        href: $el.attr('href')
        title: $el.text()
        tags: $el.attr('tags')
      }  
  ).get()

@import = (req, res, next) ->
  return res.redirect("/log_in") unless req.user
  res.render "index", title: 'Import'
 
@upload = (req, res, next) ->
  return res.redirect("/log_in") unless req.user
  res.render "upload", title: 'Import'

@parseBookmarks = (req, res, next) ->
  fs.readFile req.files.bookmarks.path, (err, data) ->
    links = parseBookmarks data.toString('utf-8')
    res.locals.sd.BOOKMARKS = links

    res.render "make_connections", 
      bookmarks: new Backbone.Collection links
      error: err
      title: "Import"
  