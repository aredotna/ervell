Base = require("./base.coffee")
FeedItem = require '../models/feed_item'

module.exports = class FeedGroup extends Base
  model: FeedItem

  initialize: (models)->
    super
    # For collection view rendering. Chaplin creates item views
    # as subviews, suffixed by cid. If collections have the same 
    # (including null) cid, their views overwrite each other
    @cid = _.uniqueId('fg')

  isNew: -> @any (model) -> model.get('is_read') is false

  # Necessary because we're using this collection inside another collection,
  # and that collection calls _validate on instantiated models
  _validate: -> true
