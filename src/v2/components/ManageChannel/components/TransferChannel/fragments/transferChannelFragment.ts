import { gql } from '@apollo/client'

export default gql`
  fragment TransferChannel on Channel {
    id
    can {
      transfer
    }
    is_pending_transfer
    transfer_request {
      recipient {
        __typename
        ... on User {
          id
          name
        }
        ... on Group {
          id
          name
        }
      }
      is_recipient_member
    }
    visibility
  }
`
