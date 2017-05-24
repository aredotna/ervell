{ pick } = require 'underscore'
Backbone = require 'backbone'
Backbone.$ = $
Comment = require '../../../models/comment.coffee'
mediator = require '../../../lib/mediator.coffee'
sd = require('sharify').data
analytics = require '../../../lib/analytics.coffee'
xss = require 'xss'
MentionQuicksearchView = require '../../mention_quicksearch/client/mention_quicksearch_view.coffee'
template = -> require('../templates/index.jade') arguments...

module.exports = class NewCommentView extends Backbone.View
  events:
    'click' : 'checkClick'
    'click .js-button': 'addComment'
    'keydown .js-input' : 'onKeyDown'

  initialize: ({ @block_id, @comments, @autoRender }) ->
    @render() if @autoRender

    @quicksearch = new MentionQuicksearchView
      container: @$el,
      input: @$('.js-input')

  fieldIsEmpty: ->
    @$input.val() is ''

  onKeyDown: (e) ->
    if e.keyCode is 13 and e.shiftKey
      @addComment()
      return false

  addComment: ->
    if not @fieldIsEmpty()
      userAttrs = pick mediator.shared.current_user.attributes, [
        'slug', 'username', 'avatar', 'id'
      ]

      comment = new Comment
        body: xss @$input.val()
        user: userAttrs
        created_at: new Date()
      , block_id: @block_id

      @$input.attr 'disabled', 'disabled'

      @comments.add comment

      comment.save {},
        success: =>
          analytics.track.click 'Comment added'
          @$input.removeAttr 'disabled'
          @$input.val ''

  render: ->
    @$el.html template()
    @$input = @$('.js-input')
    this
