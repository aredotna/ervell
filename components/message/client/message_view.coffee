Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'

module.exports = class MessageView extends Backbone.View

  events:
    'click .message__inner__close' : 'remove'

  initialize: -> @render()

  render: ->
    # do this directly for now, thinking of different templates with the same view but may just have to be different views (similar to other components)
    @$el.append require("../templates/announcement.jade") message: @model

  remove: ->
    # assign cookie here
    super
