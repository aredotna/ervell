import { gql } from '@apollo/client'

import profileMetadataFragment from 'v2/components/ProfileMetadata/fragments/profileMetadata'
import emptyOrTipsFragment from 'v2/pages/profile/ProfilePage/components/EmptyMessageOrComponent/fragments/emptyOrTips'
import profileMetaTagsFragment from 'v2/pages/profile/ProfilePage/components/ProfileMetaTags/fragments/profileMetaTags'

export default gql`
  fragment ProfilePageIdentifiable on Identifiable {
    __typename
    ...ProfileMetadata
    ...EmptyOrTips
    ...ProfileMetaTags
    ... on User {
      counts {
        channels
        blocks
      }
    }
    ... on Group {
      counts {
        channels
      }
    }
  }
  ${profileMetadataFragment}
  ${emptyOrTipsFragment}
  ${profileMetaTagsFragment}
`
