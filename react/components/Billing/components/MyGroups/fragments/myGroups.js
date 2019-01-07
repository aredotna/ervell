import gql from 'graphql-tag';

import myGroupCheckoutFragment from 'react/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupCheckout/fragments/myGroupCheckout';
import groupFragment from 'react/components/Billing/components/MyGroups/components/MyGroup/fragments/myGroup';

export default gql`
  fragment MyGroups on Me {
    ...MyGroupCheckout
    groups(page: 1, per: 50, type: OWNER) {
      __typename
      id
      counts {
        users
      }
      ...MyGroup
    }
  }
  ${myGroupCheckoutFragment}
  ${groupFragment}
`;
