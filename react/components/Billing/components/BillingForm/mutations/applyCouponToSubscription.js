import gql from 'graphql-tag';

import billingFormFragment from 'react/components/Billing/components/BillingForm/fragments/billingForm';

export default gql`
  mutation ApplyCouponToSubscription($coupon_code: String!) {
    apply_coupon_to_subscription(input: { coupon_code: $coupon_code }) {
      me {
        ...BillingForm
      }
    }
  }
  ${billingFormFragment}
`;
