import { gql } from '@apollo/client'

import billingFormFragment from 'v2/components/Billing/components/BillingForm/fragments/billingForm'

export default gql`
  mutation ApplyCouponToSubscription(
    $coupon_code: String!
    $plan_id: SupportedPlanEnum
  ) {
    apply_coupon_to_subscription(input: { coupon_code: $coupon_code }) {
      me {
        ...BillingForm
      }

      upcoming: me {
        customer {
          __typename
          id
          invoice: upcoming_invoice(
            plan_id: $plan_id
            coupon_code: $coupon_code
          ) {
            __typename
            subtotal
            total
            next_payment_attempt_at(format: "%D")
          }
        }
      }
    }
  }
  ${billingFormFragment}
`
