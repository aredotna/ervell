_ = require 'underscore'
Backbone = require "backbone"
Backbone.$ = $
Comment = require "../../../models/comment.coffee"
mediator = require '../../../lib/mediator.coffee'
sd = require("sharify").data
analytics = require '../../../lib/analytics.coffee'
MentionQuicksearchView = require '../../mention_quicksearch/client/mention_quicksearch_view.coffee'

newCommentTemplate = -> require('../templates/new_comment.jade') arguments...

module.exports = class NewCommentView extends Backbone.View

  events:
    'click .new-comment__submit': 'addComment'
    'click' : 'checkClick'

  initialize: (options)->
    { @block_id, @comments, @autoRender } = options
    @render() if @autoRender

    @quicksearch = new MentionQuicksearchView
      container: @$el,
      input: @$('.new-comment__field')

  fieldIsEmpty: ->
    @$input.val() is ""

  addComment: ->
    if not @fieldIsEmpty()
      userAttrs = _.pick(mediator.shared.current_user.attributes, ['slug', 'username', 'avatar', 'id'])

      comment = new Comment
        body: @$input.val()
        user: userAttrs
        created_at: new Date()
      , block_id: @block_id

      @$input.attr "disabled", "disabled"

      @comments.add comment

      comment.save {},
        success: =>
          analytics.track.click "Comment added"
          @$input.removeAttr 'disabled'
          @$input.val ""

  render: ->
    @$el.html newCommentTemplate()
    @$input = @$('input.new-comment__field')
