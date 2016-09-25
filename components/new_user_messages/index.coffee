Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
Cookies = require 'cookies-js'
mediator = require '../../lib/mediator.coffee'
MessageView = require '../message/client/message_view.coffee'

module.exports = class NewUserMessageView extends Backbone.View
  messages:[
    {
      id: 'help_message'
      title: "Welcome"
      body: "If you need help check the <a href='/about'>FAQs</a>. Also feel free to give us suggestions or report bugs in our <a href='/are-na/feedback'>feedback channel</a>"
      type: 'announcement'
    },
    {
      id: 'channel_message'
      title: "Channels"
      body: "<a class='pointer trigger-mediator' data-trigger='new:channel'>Create a new channel</a>, <a href='/explore'>explore</a> recent activity or search for existing ones."
      type: 'announcement'
    },
    {
      id: 'bookmarklet_message'
      title: "Bookmarklet"
      body: "Install our <a href='/tools/bookmarklet'>bookmarklet</a> to add content you find online while browsing"
      type: 'announcement'
    },
    {
      id: 'find_friends_message'
      title: "Find friends"
      body: "<a href='/tools/find-friends'>Connect your Twitter account</a> to find friends who already use Are.na"
      type: 'announcement'
    }
  ]

  initialize: ({ @container })->
    hasReadMessages = _.every @messages, (message) -> Cookies.get message.id
    # if they all have cookies, update the user, don't show the tour
    if hasReadMessages and mediator.shared.current_user.get('show_tour') is true
      mediator.shared.current_user.save show_tour: false
    else
      for message in @messages
        new MessageView
          container: @container
          model: new Backbone.Model message

