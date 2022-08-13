import { gql } from '@apollo/client'
import profileMetadataFragment from 'v2/components/ProfileMetadata/fragments/profileMetadata'
import profileMetaTagsFragment from 'v2/pages/profile/ProfilePage/components/ProfileMetaTags/fragments/profileMetaTags'

export default gql`
  query ProfileSearchPageQuery($id: ID!) {
    identity(id: $id) {
      __typename
      identifiable {
        ...ProfileMetadata
        ...ProfileMetaTags
      }
    }
  }
  ${profileMetadataFragment}
  ${profileMetaTagsFragment}
`
