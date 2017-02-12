sd = require("sharify").data
fs = require "fs"
cheerio = require "cheerio"
Backbone = require "backbone"

parseBookmarks = (data) ->
  $ = cheerio.load data
  $('a').map((i, el) ->
    unless $(this).attr('href').indexOf('javascript:') > -1
      return {
        id: i
        href: $(this).attr('href')
        title: $(this).text()
      }  
  ).get()

@import = (req, res, next) ->
  return res.redirect("/log_in") unless req.user
  return res.redirect("/import/browser") unless req.params.tab
  tab = res.locals.sd.TAB = req.params.tab
  res.render "index", tab: tab, title: 'Import'

@parseBookmarks = (req, res, next) ->
  fs.readFile req.files.bookmarks.path, (err, data) ->
    links = parseBookmarks data.toString('utf-8')
    res.locals.sd.BOOKMARKS = links
    tab = res.locals.sd.TAB = 'upload'

    res.render "make_connections", 
      bookmarks: new Backbone.Collection links
      error: err
      tab:  tab
      title: "Import"
  