import { gql } from '@apollo/client'

export default gql`
  query GroupPlanChanges(
    $group_id: ID!
    $plan_id: SupportedPlanEnum!
    $quantity: Int!
    $coupon_code: String
  ) {
    group(id: $group_id) {
      __typename
      id
      invoice: upcoming_invoice(
        plan_id: $plan_id
        quantity: $quantity
        coupon_code: $coupon_code
      ) {
        __typename
        subtotal
        total
        next_payment_attempt_at(format: "%D")
      }
    }
  }
`
