sd = require('sharify').data
{ Collection } = require 'backbone'
initBookmarksViews = require './client/select_bookmarks_view.coffee'

module.exports.init = ->
  initBookmarksViews(new Collection sd.BOOKMARKS)