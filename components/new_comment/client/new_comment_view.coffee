Backbone = require "backbone"
Backbone.$ = $
Comment = require "../../../models/comment.coffee"
sd = require("sharify").data

newCommentTemplate = -> require('../templates/new_comment.jade') arguments...

module.exports = class NewCommentView extends Backbone.View

  events:
    'keyup .new-comment__field' : 'onKeyUp'

  initialize: (options)->
    @render() if options.autoRender

  onKeyUp: (e)->
    e.preventDefault()
    e.stopPropagation()

    console.log 'onKeyUp'

    switch e.keyCode
      when 13
        @addComment()

  fieldIsEmpty: -> @$input.val() is ""

  addComment: ->
    if not @fieldIsEmpty()
      userAttrs = _.pick(mediator.shared.user.attributes, ['slug', 'username', 'avatar', 'id'])

      comment = new Comment

  render: ->
    @$el.html newCommentTemplate()
    @$input = @$('input.new-comment__field')
