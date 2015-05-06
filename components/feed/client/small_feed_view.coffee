FeedView = require "./feed_view.coffee"
Comment = require '../../../models/comment.coffee'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
EditableAttributeView = require '../../editable_attribute/client/editable_attribute_view.coffee'

commentTemplate = -> require('../../../components/feed/templates/comment_sentence.jade') arguments...
feedTemplate = -> require('../../../components/feed/templates/feed_group_sentence.jade') arguments...

module.exports = class SmallFeedView extends FeedView

  initialize: ({ @block_id })->
    super

    mediator.on 'new:comment', @addComment

  addComment: (comment)=>
    @$el.append commentTemplate comment: comment

  renderGroup: (group)->
    @$el.append feedTemplate group: group

    if group.is_comment()
      comment = new Comment group.first_item(), block_id: @block_id

      new EditableAttributeView
        model: comment
        el: @$("#attribute-body_#{comment.id}")
        _attribute: 'body'
        _kind: 'plaintext'
        wait: true

  render: =>
    @collection.each (group) => @renderGroup group