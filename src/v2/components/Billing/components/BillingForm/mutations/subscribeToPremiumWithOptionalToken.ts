import { gql } from '@apollo/client'

import billingFormFragment from 'v2/components/Billing/components/BillingForm/fragments/billingForm'

export default gql`
  mutation SubscribeToPremiumWithOptionalToken(
    $plan_id: SupportedPlanEnum!
    $coupon_code: String
    $token: String
  ) {
    subscribe_to_premium_with_optional_token(
      input: { plan_id: $plan_id, coupon_code: $coupon_code, token: $token }
    ) {
      me {
        ...BillingForm
      }
    }
  }
  ${billingFormFragment}
`
