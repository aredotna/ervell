import { gql } from '@apollo/client'

export const channelEmptyMessageFragment = gql`
  fragment ChannelEmptyMessage on Channel {
    __typename
    id
    counts {
      contents
    }
    can {
      add_to
      add_to_as_premium
    }
    owner {
      __typename
      ... on User {
        id
        name
        href
      }
      ... on Group {
        id
        name
        href
      }
    }
  }
`
