import { gql } from '@apollo/client'

import profileBadgeFragment from 'v2/components/ProfileMetadata/components/ProfileBreadcrumb/components/ProfileBadge/fragments/profileBadge'

export default gql`
  fragment ProfileBreadcrumb on Identifiable {
    __typename

    ... on User {
      name
      label: name
      href
      ...ProfileBadge
    }

    ... on Group {
      name
      label: name
      href
      visibility
    }
  }

  ${profileBadgeFragment}
`
