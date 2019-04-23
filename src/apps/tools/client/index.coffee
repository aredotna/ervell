{ TAB } = require('sharify').data
sendInvitation = require '../components/send_invitation/index.coffee'

{ mountWithApolloProvider } = require '../../../v2/apollo/index'
{ default: FindFriends } = require '../../../v2/components/FindFriends/index'

module.exports = ->
  switch TAB
    when 'find-friends'
      mountWithApolloProvider FindFriends, { }, $('.js-find-friends')

    when 'send-invitation'
      sendInvitation $('.js-send-invitation')
