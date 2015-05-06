Base = require("./base.coffee")
FeedItem = require '../models/feed_item.coffee'
Block = require '../models/block.coffee'
Channel = require '../models/channel.coffee'
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

  first_item: -> @models[0].get('item')

  items: -> @map (model)->
    if model.get('item')?.class is 'Comment'
      block = new Block model.get('target')
    else
      block = new Block model.get('item')

    block.set 'connected_by_username', model.get('user').username
    block.set 'connected_by_user_slug', model.get('user').slug

    block

  findItem: (id, klass) ->
    item = _.find @items(), (model) ->
      model.id is id and
      model.get('base_class') is klass

    item

  channel: ->
    if @models[0].get('action') is 'added'
      new Channel @first_target()

  actor: -> @models[0].get('user')

  action: ->
    if @models[0].get('action') is 'commented on'
      "said"
    else
      @models[0].get('action')

  is_single: -> @length is 1

  is_comment: ->
    @models[0].has('item') && @first_item().class is 'Comment'

  single_subject_link: (subject)->
    if @first_item()?.class is 'Channel'
      "/#{@first_item()?.user.slug}/#{@first_item().slug}"
    else if @first_item()?.class is 'User'
      "/#{@first_item()?.slug}"
    else
      "/#/block/#{@first_item()?.id}"

  single_subject_class: -> @first_item()?.base_class?.toLowerCase()

  single_subject: ->
    if @first_item()?.username?
      @first_item()?.username
    else if @is_comment()
      "#{@first_item()?.body}"
    else if @first_item()?.class is "Channel"
      @first_item()?.title
    else
      @_format_subject()

  grouped_subject: ->
    grouped = @groupBy (model)-> model.get('item').class
    groups = _.map grouped, (group)->
      first = group[0]
      type = if first.get('item_type') is 'Comment' then "\"#{first.get('item')?.body}\"" else first.get('item').class?.toLowerCase()
      type = "embed" if type is "media"
      s = if group.length > 1 then "s" else ""
      "#{group.length} #{type}#{s}"
    _.toSentence(groups)

  _format_subject: ->
    a = "a"
    klass = @first_item()?.class?.toLowerCase()

    if klass is "media"
      klass = "embed"
      a = "an"

    if klass is "attachment" or klass is "image"
      a = "an"

    "#{a} #{klass}"

  connector: -> @models[0].get('connector')

  first_target: -> @models[0].get('target')

  single_target_link: (subject)->
    if @first_target()?.class is 'Channel'
      "/#{@first_target()?.user.slug}/#{@first_target().slug}"
    else if @first_target()?.class is 'User'
      "/#{@first_target()?.slug}"
    else
      "/#/block/#{@first_target()?.id}"

  subject_privacy: ->
    if @models[0].has('item') and @first_item().class is "Channel"
      return @first_item()?.status

    return ''

  target_privacy: ->
    if @models[0].has('target') and @first_target().class is "Channel"
      return @first_target()?.status

    return ''

  single_target: ->
    if @models[0].has('target')
      if @first_target()?.username?
        @first_target()?.username
      else if @first_target()?.class is "Channel"
        @first_target()?.title
      else
        # @_format_subject()

  timestamp: -> @models[0].createdAtAgo()


