import { gql } from '@apollo/client'

export default gql`
  query OrderSummary($plan_id: SupportedPlanEnum) {
    me {
      customer {
        upcoming_invoice(plan_id: $plan_id, include_tax: true) {
          subtotal
          tax
          total
          tax_rate {
            percentage
            jurisdiction
          }
        }
      }
    }
  }
`
