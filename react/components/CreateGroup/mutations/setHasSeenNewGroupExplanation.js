import gql from 'graphql-tag';

import createGroupFragment from 'react/components/CreateGroup/fragments/createGroup';

export default gql`
  mutation SetHasSeenNewGroupExplanation {
    set_me_flags(input: { flags: { name: "has_seen_new_group_explanation", value: true } }) {
      me {
        ...CreateGroup
      }
    }
  }
  ${createGroupFragment}
`;
