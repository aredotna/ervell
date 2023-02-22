import { gql } from '@apollo/client'

export default gql`
  mutation updateGroupSubscriptionMutation(
    $subscription_id: String!
    $group_id: ID!
    $user_ids: [ID]!
  ) {
    update_incomplete_subscription_for_group(
      input: {
        subscription_id: $subscription_id
        group_id: $group_id
        user_ids: $user_ids
      }
    ) {
      subscription {
        id
      }
    }
  }
`
