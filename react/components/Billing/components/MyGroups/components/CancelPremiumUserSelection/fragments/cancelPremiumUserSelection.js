import gql from 'graphql-tag';

import cancelPremiumUserSelectorFragment from 'react/components/Billing/components/MyGroups/components/CancelPremiumUserSelection/components/CancelPremiumUserSelector/fragments/cancelPremiumUserSelector';

export default gql`
  fragment CancelPremiumUserSelection on Group {
    __typename
    id
    name
    user {
      ...CancelPremiumUserSelector
    }
    users {
      ...CancelPremiumUserSelector
    }
  }
  ${cancelPremiumUserSelectorFragment}
`;
