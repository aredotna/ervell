{ TAB } = require('sharify').data
FindFriendsView = require '../components/find_friends/view.coffee'
sendInvitation = require '../components/send_invitation/index.coffee'

module.exports = ->
  switch TAB
    when 'find-friends'
      view = new FindFriendsView el: $('.js-find-friends')
      view.render()

    when 'send-invitation'
      sendInvitation $('.js-send-invitation')
