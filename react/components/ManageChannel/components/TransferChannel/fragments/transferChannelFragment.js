import gql from 'graphql-tag';

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
`;
