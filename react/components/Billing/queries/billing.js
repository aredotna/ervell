import gql from 'graphql-tag';

import billingFormFragment from 'react/components/Billing/components/BillingForm/fragments/billingForm';
import myGroupsFragment from 'react/components/Billing/components/MyGroups/fragments/myGroups';

export default gql`
  query Billing {
    me {
      __typename
      id
      ...BillingForm
      ...MyGroups
    }
  }
  ${billingFormFragment}
  ${myGroupsFragment}
`;
