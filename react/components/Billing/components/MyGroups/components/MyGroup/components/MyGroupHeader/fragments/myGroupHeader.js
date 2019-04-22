import gql from 'graphql-tag';

import memberAvatarFragment from 'react/components/MemberAvatar/fragments/memberAvatar';
import cancelPremiumUserSelectionFragment from 'react/components/Billing/components/MyGroups/components/CancelPremiumUserSelection/fragments/cancelPremiumUserSelection';

export default gql`
  fragment MyGroupHeader on Group {
    __typename
    id
    name
    ...MemberAvatar
    ...CancelPremiumUserSelection
  }
  ${memberAvatarFragment}
  ${cancelPremiumUserSelectionFragment}
`;
