Base = require("./base.coffee")
FeedItem = require '../models/feed_item.coffee'
Block = require '../models/block.coffee'
_ = require 'underscore'
_.mixin(require 'underscore.string')

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

  items: -> @map (model)-> new Block model.get('item')

  actor: -> @models[0].get('user')

  action: -> @models[0].get('action')

  is_single: -> @length is 1

  single_subject_link: (subject)->
    if @models[0].get('item').class is 'Channel'
      "/#{@models[0].get('item').user.slug}/#{@models[0].get('item').slug}"
    else if @models[0].get('item').class is 'User'
      "/#{@models[0].get('item').slug}"
    else
      "/#/block/#{@models[0].get('item').id}"

  single_subject_class: -> @models[0].get('item').base_class.toLowerCase()

  single_subject: ->
    if @models[0].get('item').username?
      @models[0].get('item').username
    else if @models[0].get('item').class is "Channel"
      @models[0].get('item').title
    else
      @_format_subject()

  grouped_subject: ->
    grouped = @groupBy (model)-> model.get('item').class
    groups = _.map grouped, (group)->
      first = group[0]
      type = if first.get('item_type') is 'Comment' then first.get('target')?.class.toLowerCase() else first.get('item').class?.toLowerCase()
      type = "embed" if type is "media"
      s = if group.length > 1 then "s" else ""
      "#{group.length} #{type}#{s}"
    _.toSentence(groups)

  _format_subject: ->
    a = "a"
    klass = @models[0].get('item').class.toLowerCase()

    if klass is "media"
      klass = "embed"
      a = "an"

    if klass is "attachment" or klass is "image"
      a = "an"

    "#{a} #{klass}"

  connector: -> @models[0].get('connector')

  single_target_link: (subject)->
    if @models[0].get('target').class is 'Channel'
      "/#{@models[0].get('target').user.slug}/#{@models[0].get('target').slug}"
    else if @models[0].get('target').class is 'User'
      "/#{@models[0].get('target').slug}"
    else
      "/#/block/#{@models[0].get('target').id}"

  single_target: ->
    if @models[0].has('target')
      if @models[0].get('target').username?
        @models[0].get('target').username
      else if @models[0].get('target').class is "Channel"
        @models[0].get('target').title
      else
        # @_format_subject()


