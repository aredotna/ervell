BookmarkListView = require '../components/select_bookmarks/bookmark_list_view.coffee'
ImportStatusView = require '../components/import_bookmarks/import_status_view.coffee'

module.exports = (collection) ->
  new BookmarkListView
    el: $('.import__bookmarks')
    collection: collection
  
  new ImportStatusView
    el: $('.import__status-container')
    collection: collection

