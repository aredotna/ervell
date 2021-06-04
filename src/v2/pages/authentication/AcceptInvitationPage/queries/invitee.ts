import { gql } from '@apollo/client'

import inviteeFragment from 'v2/pages/authentication/AcceptInvitationPage/fragments/invitee'

export default gql`
  query Invitee($invitation_token: String!) {
    invitee(invitation_token: $invitation_token) {
      ...Invitee
    }
  }
  ${inviteeFragment}
`
