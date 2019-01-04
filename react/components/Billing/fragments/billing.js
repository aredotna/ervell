import gql from 'graphql-tag';

import billingFormFragment from 'react/components/Billing/components/BillingForm/fragments/billingForm';
import myHeaderFragment from 'react/components/Billing/components/MyHeader/fragments/myHeader';
import myGroupsFragment from 'react/components/Billing/components/MyGroups/fragments/myGroups';

export default gql`
  fragment Billing on Me {
    __typename
    id
    ...BillingForm
    ...MyHeader
    ...MyGroups
  }
  ${billingFormFragment}
  ${myHeaderFragment}
  ${myGroupsFragment}
`;
