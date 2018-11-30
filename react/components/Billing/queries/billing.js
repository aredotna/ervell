import gql from 'graphql-tag';

import billingFormFragment from 'react/components/Billing/components/BillingForm/fragments/billingForm';

export default gql`
  query Billing {
    me {
      __typename
      id
      ...BillingForm
    }
  }
  ${billingFormFragment}
`;
