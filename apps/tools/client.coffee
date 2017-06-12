sd = require('sharify').data
Authentication = require '../../models/authentication.coffee'
FindFriendsView = require './client/find_friends_view.coffee'
InviteView = require './client/invite_view.coffee'

module.exports.init = ->

  switch sd.TAB
    when 'find-friends'
      model = new Authentication provider: 'twitter'
      view = new FindFriendsView
        el: $('#tab--find-friends')
        model: model
      
      model.fetch()

    when 'send-invitation'
      new InviteView
        el: $('#tab--send-invitation')
