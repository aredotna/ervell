import gql from 'graphql-tag';

import manageCollaboratorsFragment from 'react/components/ManageCollaborators/fragments/manageCollaborators';

export default gql`
  mutation removeChannelMember($member_id: ID!, $member_type: MemberTypes, $channel_id: ID!) {
    remove_channel_member(input: { member_id: $member_id, member_type: $member_type, channel_id: $channel_id }) {
      channel {
        ...ManageCollaborators
      }
    }
  }
  ${manageCollaboratorsFragment}
`;
