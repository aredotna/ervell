import { gql } from '@apollo/client'

export default gql`
  query GroupOrderSummary(
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
        tax
        total
        discount {
          id
          coupon {
            id
            description
          }
        }
        tax_rate {
          percentage
          jurisdiction
        }
      }
    }
  }
`
