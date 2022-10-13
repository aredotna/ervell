import { gql } from '@apollo/client'

export default gql`
  query SecondaryChannelBreadcrumbQuery($channel_id: ID!) {
    channel(id: $channel_id) {
      id
      title
      slug
    }
  }
`
