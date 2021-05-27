import { gql } from '@apollo/client'

import customBadgeFragment from 'v2/components/CustomBadgeUploader/fragments/customBadge'

export default gql`
  query BadgeCheck {
    me {
      ...CustomBadge
    }
  }
  ${customBadgeFragment}
`
