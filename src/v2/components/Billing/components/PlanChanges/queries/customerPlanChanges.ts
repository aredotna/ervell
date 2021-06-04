import { gql } from '@apollo/client'

export default gql`
  query CustomerPlanChanges($plan_id: SupportedPlanEnum, $coupon_code: String) {
    me {
      __typename
      id
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
`
