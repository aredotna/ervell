import { gql } from '@apollo/client'

export default gql`
  mutation SetupIncompleteSubscription($plan_id: SupportedPlanEnum!) {
    setup_incomplete_subscription(input: { plan_id: $plan_id }) {
      subscription {
        id
        status
      }
      client_secret
    }
  }
`
