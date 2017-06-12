Comments = require '../../collections/comments.coffee'
CommentsView = require './client/view.coffee'
NewCommentView = require '../new_comment/client/view.coffee'

module.exports = (block, $el) ->
  @comments = new Comments [], block: block

  view = new CommentsView
    collection: @comments
    el: $el

  @comments.fetch()

  view.on 'render', =>
    newCommentView = new NewCommentView
      el: $('.js-new-comment')
      comments: @comments
      block_id: block.id

    newCommentView.postRender()
