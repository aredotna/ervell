import { gql } from '@apollo/client'

export default gql`
  mutation updateGroupSubscriptionMutation($subscription_id: String!) {
    update_incomplete_subscription(
      input: { subscription_id: $subscription_id }
    ) {
      subscription {
        id
      }
    }
  }
`
