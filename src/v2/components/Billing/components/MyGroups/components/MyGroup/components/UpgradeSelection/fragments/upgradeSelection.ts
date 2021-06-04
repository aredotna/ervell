import { gql } from '@apollo/client'

import upgradeCTAFragment from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/UpgradeSelection/components/UpgradeCTA/fragments/upgradeCTA'

export default gql`
  fragment UpgradeSelection on Group {
    __typename
    id
    ...UpgradeCTA
  }

  ${upgradeCTAFragment}
`
