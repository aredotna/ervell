import gql from 'graphql-tag';

import myGroupFragment from 'react/components/UserDropdown/components/MyGroups/components/MyGroup/fragments/myGroup';

export default gql`
  fragment MyGroups on Me {
    groups(page: 1, per: 25) {
      ... MyGroup
    }
  }
  ${myGroupFragment}
`;
