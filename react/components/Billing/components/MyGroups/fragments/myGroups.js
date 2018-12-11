import gql from 'graphql-tag';

import groupFragment from 'react/components/Billing/components/MyGroups/components/MyGroup/fragments/myGroup';
import userSelectionFragment from 'react/components/Billing/components/MyGroups/components/UserSelection/components/fragments/userSelection';

export default gql`
  fragment MyGroups on Me {
    groups(page: 1, per: 50) {
      __typename
      id
      counts {
        users
      }
      ...MyGroup
      ...UserSelection
    }
  }
  ${groupFragment}
  ${userSelectionFragment}
`;
