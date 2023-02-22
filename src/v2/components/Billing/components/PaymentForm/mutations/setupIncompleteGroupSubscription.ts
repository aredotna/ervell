import { gql } from '@apollo/client'

export default gql`
  mutation SetupIncompleteGroupSubscription(
    $plan_id: SupportedPlanEnum!
    $coupon_code: String
    $group_id: ID!
    $user_ids: [ID]!
  ) {
    setup_incomplete_subscription_for_group(
      input: {
        plan_id: $plan_id
        coupon_code: $coupon_code
        group_id: $group_id
        user_ids: $user_ids
      }
    ) {
      subscription {
        id
        status
      }
      client_secret
    }
  }
`
