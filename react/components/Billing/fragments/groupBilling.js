import gql from 'graphql-tag';

import myGroupsFragment from 'react/components/Billing/components/MyGroups/fragments/myGroups';

export default gql`
  fragment GroupBilling on Me {
    __typename
    id
    ...MyGroups
  }
  ${myGroupsFragment}
`;
