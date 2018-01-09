{ truncate } = require 'underscore.string'
{ CHANNEL } = require('sharify').data
Channel = require '../../../../models/channel.coffee'
ChannelShareView = require './view.coffee'

generateText = ({ title, user, collaborators }) ->
  text = "#{truncate(title, 50)} by #{user.full_name}"
  text += " (with #{collaborators.length} collaborators)" if collaborators.length
  text

module.exports = ->
  $el = $('.js-channel-share')

  channel = new Channel CHANNEL

  view = new ChannelShareView
    channel: channel
    text: generateText(CHANNEL)

  $el.html view.render().$el
