import gql from 'graphql-tag';

import billingFormFragment from 'react/components/Billing/components/BillingForm/fragments/billingForm';
import myHeaderFragment from 'react/components/Billing/components/MyHeader/fragments/myHeader';

export default gql`
  fragment Billing on Me {
    __typename
    id
    ...BillingForm
    ...MyHeader
  }
  ${billingFormFragment}
  ${myHeaderFragment}
`;
