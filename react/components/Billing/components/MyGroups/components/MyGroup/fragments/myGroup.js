import gql from 'graphql-tag';

import myGroupHeaderFragment from 'react/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupHeader/fragments/myGroupHeader';
import upgradeSelectionFragment from 'react/components/Billing/components/MyGroups/components/MyGroup/components/UpgradeSelection/fragments/upgradeSelection';

export default gql`
  fragment MyGroup on Group {
    __typename
    id
    is_premium
    ...MyGroupHeader
    ...UpgradeSelection

  }
  ${myGroupHeaderFragment}
  ${upgradeSelectionFragment}
`;
