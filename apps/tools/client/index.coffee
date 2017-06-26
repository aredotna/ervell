{ TAB } = require('sharify').data
Authentication = require '../../../models/authentication.coffee'
FindFriendsView = require './find_friends_view.coffee'
sendInvitation = require '../components/send_invitation/index.coffee'

module.exports = ->
  switch TAB
    when 'find-friends'
      model = new Authentication provider: 'twitter'
      view = new FindFriendsView
        el: $('#tab--find-friends')
        model: model

      model.fetch()

    when 'send-invitation'
      sendInvitation $('.js-send-invitation')
