import gql from 'graphql-tag';

import createGroupFragment from 'v2/components/CreateGroup/fragments/createGroup';

export default gql`
  mutation SetHasSeenNewGroupExplanation {
    set_me_flags(
      input: { flags: { name: "has_seen_new_group_explanation", value: true } }
    ) {
      me {
        ...CreateGroup
      }
    }
  }
  ${createGroupFragment}
`;
