import gql from 'graphql-tag';

import cancelPremiumUserSelectorFragment from 'react/components/Billing/components/MyGroups/components/CancelPremiumUserSelection/components/CancelPremiumUserSelector/fragments/cancelPremiumUserSelector';

export default gql`
  mutation CancelPremiumSubscriptions($user_ids: [ID]!) {
    cancel_premium_subscriptions(input: { user_ids: $user_ids }) {
      users {
        ...CancelPremiumUserSelector
      }
    }
  }
  ${cancelPremiumUserSelectorFragment}
`;
