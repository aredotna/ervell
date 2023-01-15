import { gql } from '@apollo/client'

export default gql`
  mutation SetupIncompleteSubscription(
    $plan_id: SupportedPlanEnum!
    $coupon_code: String
  ) {
    setup_incomplete_subscription(
      input: { plan_id: $plan_id, coupon_code: $coupon_code }
    ) {
      subscription {
        id
        status
      }
      client_secret
    }
  }
`
