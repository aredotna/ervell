Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Cookies = require 'cookies-js'
mediator = require '../../../lib/mediator.coffee'

module.exports = class MessageView extends Backbone.View

  events:
    'tap .message__inner__close' : 'remove'

  initialize: ->
    # only render if user does not have cookie
    @render() if not Cookies.get @model.id

  render: ->
    # do this directly for now, thinking of different templates with the same view
    # but may just have to be different views (similar to other components)
    @$el.append require("../templates/announcement.jade") message: @model

  remove: ->
    # user has now seen the model
    Cookies.set @model.id, true
    super
