{ TAB } = require('sharify').data
sendInvitation = require '../components/send_invitation/index.coffee'

{ mountWithApolloProvider } = require '../../../react/apollo/index.js'
{ default: FindFriends } = require '../../../react/components/FindFriends/index.js'

module.exports = ->
  switch TAB
    when 'find-friends'
      mountWithApolloProvider FindFriends, { }, $('.js-find-friends')

    when 'send-invitation'
      sendInvitation $('.js-send-invitation')
