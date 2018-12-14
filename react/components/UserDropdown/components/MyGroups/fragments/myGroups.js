import gql from 'graphql-tag';

import myGroupFragment from 'react/components/UserDropdown/components/MyGroups/components/MyGroup/fragments/myGroup';

export default gql`
  fragment MyGroups on Me {
    __typename
    id
    is_my_groups_dropdown_visible: flag(name: "is_my_groups_dropdown_visible")
    groups(page: 1, per: 50) {
      ... MyGroup
    }
  }
  ${myGroupFragment}
`;
