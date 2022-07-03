import { gql } from '@apollo/client'
import profileMetadataFragment from 'v2/components/ProfileMetadata/fragments/profileMetadata'

export default gql`
  query ProfileSearchPageQuery($id: ID!) {
    identity(id: $id) {
      __typename
      identifiable {
        ...ProfileMetadata
      }
    }
  }
  ${profileMetadataFragment}
`
