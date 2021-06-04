import { gql } from '@apollo/client'

import myGroupHeaderFragment from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupHeader/fragments/myGroupHeader'
import upgradeSelectionFragment from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/UpgradeSelection/fragments/upgradeSelection'
import userSelectionFragment from 'v2/components/Billing/components/MyGroups/components/UserSelection/fragments/userSelection'

export default gql`
  fragment MyGroup on Group {
    __typename
    id
    is_premium
    is_upgradeable
    subscription {
      __typename
      id
      plan {
        __typename
        id
      }
    }
    ...MyGroupHeader
    ...UpgradeSelection
    ...UserSelection
  }
  ${myGroupHeaderFragment}
  ${upgradeSelectionFragment}
  ${userSelectionFragment}
`
