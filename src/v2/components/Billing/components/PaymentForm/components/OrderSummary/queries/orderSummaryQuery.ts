import { gql } from '@apollo/client'

export default gql`
  query OrderSummary($plan_id: SupportedPlanEnum, $coupon_code: String) {
    me {
      customer {
        upcoming_invoice(
          plan_id: $plan_id
          include_tax: true
          coupon_code: $coupon_code
        ) {
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
  }
`
