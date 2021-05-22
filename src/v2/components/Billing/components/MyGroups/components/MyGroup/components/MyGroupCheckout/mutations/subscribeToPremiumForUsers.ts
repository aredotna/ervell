import { gql } from '@apollo/client'

import myGroupCheckoutFragment from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupCheckout/fragments/myGroupCheckout'

export default gql`
  mutation SubscribeToPremiumForUsers(
    $group_id: ID!
    $user_ids: [ID]!
    $token: String!
    $plan_id: SupportedPlanEnum!
    $coupon_code: String
  ) {
    subscribe_to_premium_for_users(
      input: {
        group_id: $group_id
        user_ids: $user_ids
        token: $token
        plan_id: $plan_id
        coupon_code: $coupon_code
      }
    ) {
      me {
        __typename
        id
        ...MyGroupCheckout
      }
    }
  }
  ${myGroupCheckoutFragment}
`
