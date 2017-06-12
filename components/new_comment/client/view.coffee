xss = require 'xss'
{ pick, invoke } = require 'underscore'
Backbone = require 'backbone'
Backbone.$ = $
Comment = require '../../../models/comment.coffee'
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
MentionQuicksearchView = require '../../mention_quicksearch/client/mention_quicksearch_view.coffee'
template = -> require('../templates/index.jade') arguments...

module.exports = class NewCommentView extends Backbone.View
  className: 'NewComment'

  events:
    'input': 'onInput'
    'click .js-submit': 'addComment'
    'keydown .js-input' : 'onKeyDown'

  initialize: ({ @block_id, @comments }) -> #

  onInput: ->
    if (@dom.input.val()?.trim()) isnt ''
      @$el.addClass "#{@className}--typing"
      @dom.submit.removeAttr 'disabled'
    else
      @$el.removeClass "#{@className}--typing"
      @dom.submit.attr 'disabled', true

  onKeyDown: (e) ->
    if e.keyCode is 13 and e.shiftKey
      # <shift> + <enter>: pass through line break
      return

    if e.keyCode is 13 and not e.shiftKey
      # <enter>: trigger save
      e.preventDefault()
      @addComment()

  addComment: ->
    if @dom.input.val()?.trim() isnt ''
      userAttrs = pick mediator.shared.current_user.attributes, [
        'slug', 'username', 'avatar', 'id'
      ]

      comment = new Comment
        body: xss @dom.input.val()
        # Extra values for optimistic rendering
        user: userAttrs
        created_at: new Date()
      , block_id: @block_id

      @dom.input.attr 'disabled', 'disabled'

      @comments.add comment

      comment.save {},
        success: =>
          analytics.track.click 'Comment added' # TODO: Extract analytics
          @dom.input.removeAttr 'disabled'
          @dom.input.val ''
        error: =>
          @dom.submit.text 'Error'
          setTimeout (=> @dom.submit.text 'Add comment'), 2000

  postRender: ->
    invoke @subViews, 'remove'

    @dom =
      input: @$('.js-input')
      submit: @$('.js-submit')

    mentionQuicksearchView = new MentionQuicksearchView
      container: @$('.js-comment-container'),
      input: @dom.input

    @subViews = [
      mentionQuicksearchView
    ]

  render: ->
    @$el.html template()
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
    super
