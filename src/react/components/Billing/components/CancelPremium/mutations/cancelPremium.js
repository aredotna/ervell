import gql from 'graphql-tag';

import billingFormFragment from 'react/components/Billing/components/BillingForm/fragments/billingForm';

export default gql`
  mutation CancelPremium {
    cancel_premium_subscription(input: {}) {
      me {
        ...BillingForm
      }
    }
  }
  ${billingFormFragment}
`;
