import { gql } from '@apollo/client'
import fullChannelMetadataActions from '../../FullChannelMetadataActions/fragments/fullChannelMetadataActions'

export default gql`
  query FullChannelMetadata($id: ID!) {
    channel(id: $id) {
      ... on Model {
        created_at_unix_time: created_at(format: "%s")
        created_at_timestamp: created_at
        created_at(relative: true)
        updated_at(relative: true)
        updated_at_timestamp: updated_at
      }
      ... on ConnectableInterface {
        title
        description(format: HTML)
        user {
          __typename
          id
          name
          href
        }
      }
      ...FullChannelMetadataActions
    }
  }
  ${fullChannelMetadataActions}
`
