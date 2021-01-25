import gql from 'graphql-tag'

import billingFormFragment from 'v2/components/Billing/components/BillingForm/fragments/billingForm'

export default gql`
  mutation SubscribeToPremiumWithoutToken(
    $plan_id: SupportedPlanEnum!
    $coupon_code: String
  ) {
    subscribe_to_premium_without_token(
      input: { plan_id: $plan_id, coupon_code: $coupon_code }
    ) {
      me {
        ...BillingForm
      }
    }
  }
  ${billingFormFragment}
`
