import gql from 'graphql-tag';

import manageCollaboratorsFragment from 'react/components/ManageCollaborators/fragments/manageCollaborators';

export default gql`
  mutation addChannelMemberMutation($channel_id: ID!, $member_id: ID!, $member_type: MemberTypes) {
    add_channel_members(input: { id: $channel_id, members: [{ id: $member_id, type: $member_type }] }) {
      channel {
        ...ManageCollaborators
      }
    }
  }
  ${manageCollaboratorsFragment}
`;
