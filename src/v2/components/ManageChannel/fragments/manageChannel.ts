import { gql } from '@apollo/client'

import transferChannelFragment from 'v2/components/ManageChannel/components/TransferChannel/fragments/transferChannelFragment'

export default gql`
  fragment ManageChannel on Channel {
    id
    href
    title
    description(format: MARKDOWN)
    visibility
    content_flag
    can {
      destroy
      export
    }
    user {
      id
    }
    owner {
      __typename
      ... on User {
        id
      }
      ... on Group {
        id
      }
    }
    ...TransferChannel
  }
  ${transferChannelFragment}
`
