import { gql } from '@apollo/client'

export default gql`
  fragment KonnectableMetadata on Konnectable {
    ... on Model {
      updated_at(relative: true)
    }
    ... on ConnectableInterface {
      title
      user {
        id
        name
      }
      connection {
        created_at(relative: true)
        user {
          id
          name
        }
      }
      ... on Attachment {
        file_extension
      }
    }
  }
`
