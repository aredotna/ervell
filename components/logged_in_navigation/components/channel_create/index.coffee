{ CURRENT_USER, API_URL } = require('sharify').data
Channel = require '../../../../models/channel.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
ChannelCreateView = require './view.coffee'

module.exports = ($el) ->
  user = new CurrentUser CURRENT_USER
  channel = new Channel status: 'closed'

  channel.url = "#{API_URL}/channels"

  view = new ChannelCreateView
    el: $el
    user: user
    model: channel

  view.render()
  view
