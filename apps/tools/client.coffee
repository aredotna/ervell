sd = require("sharify").data
Backbone = require 'backbone'
Backbone.$ = $
Authentication = require '../../models/authentication.coffee'
FindFriendsView = require './client/find_friends_view.coffee'
InviteView = require './client/invite_view.coffee'
PremiumView = require './client/premium_view.coffee'

module.exports.init = ->

  switch sd.TAB
    when 'find-friends'
      view = new FindFriendsView
        el: $('#tab--find-friends')
        model: new Authentication provider: 'twitter'

      view.model.fetch()

    when 'send-invitation'
      new InviteView
        el: $('#tab--send-invitation')

    when 'premium'
      new PremiumView
        el: $('#tab--premium')
