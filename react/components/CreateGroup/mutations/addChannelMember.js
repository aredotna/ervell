import gql from 'graphql-tag';

import manageCollaboratorsFragment from 'react/components/ManageCollaborators/fragments/manageCollaborators';

export default gql`
  mutation addChannelMemberMutation($channel_id: ID!, $member_id: ID!, $member_type: MemberTypes) {
    add_channel_member(input: { channel_id: $channel_id, member_id: $member_id, member_type: $member_type }) {
      channel {
        ...ManageCollaborators
      }
    }
  }
  ${manageCollaboratorsFragment}
`;
