import gql from 'graphql-tag';

import inviteeFragment from 'react/pages/authentication/AcceptInvitationPage/fragments/invitee';

export default gql`
  query Invitee($invitation_token: String!) {
    invitee(invitation_token: $invitation_token) {
      ...Invitee
    }
  }
  ${inviteeFragment}
`;
