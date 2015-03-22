FeedView = require "./feed_view.coffee"
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'

commentTemplate = -> require('../../../components/feed/templates/comment_sentence.jade') arguments...
feedTemplate = -> require('../../../components/feed/templates/feed_group_sentence.jade') arguments...

module.exports = class SmallFeedView extends FeedView

  initialize: ->
    super

    mediator.on 'new:comment', @addComment

  addComment: (comment)=>
    @$el.append commentTemplate comment: comment

  renderGroup: (group)->
    @$el.append feedTemplate group: group

  render: =>
    @collection.each (group) => @renderGroup group