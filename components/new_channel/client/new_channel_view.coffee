Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Channel = require '../../../models/channel.coffee'
mediator = require '../../../lib/mediator.coffee'

newChannelTemplate = -> require('../templates/new_channel.jade') arguments...

module.exports = class NewChannelView extends Backbone.View

  initialize: (options)->
    @model = new Channel
      class: 'Channel'
      status: 'public'
      user: mediator.shared.current_user.attributes
      length: 0

    @render()

  render: ->
    @$el.append newChannelTemplate(block: @model)
