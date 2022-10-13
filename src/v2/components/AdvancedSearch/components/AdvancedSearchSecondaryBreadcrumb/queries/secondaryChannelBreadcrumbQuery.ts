import { gql } from '@apollo/client'

export default gql`
  query SecondaryChannelBreadcrumbQuery($channel_id: ID!) {
    channel(id: $channel_id) {
      __typename
      id
      title
      slug
      visibility
      href
      owner {
        __typename
        ... on User {
          id
          name
          label: name
        }

        ... on Group {
          id
          name
          label: name
        }
      }
    }
  }
`
