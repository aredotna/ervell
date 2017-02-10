sd = require('sharify').data
{ Collection } = require 'backbone'
initBookmarksViews = require './client/select_bookmarks_view.coffee'

module.exports.init = ->
  switch sd.TAB
    when 'upload'
      initBookmarksViews(new Collection sd.BOOKMARKS)