import gql from 'graphql-tag'

export const channelContentsFilterFragment = gql`
  fragment ChannelContentsFilter on Channel {
    __typename
    id
    title
    counts {
      contents
    }
  }
`
