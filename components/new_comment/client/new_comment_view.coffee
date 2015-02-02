Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data

newCommentTemplate = -> require('../templates/new_comment.jade') arguments...

module.exports = class NewCommentView extends Backbone.View

  initialize: (options)->
    @render() if options.autoRender

  render: ->
    @$el.html newCommentTemplate()
