import gql from 'graphql-tag';

export default gql`
  fragment TransferChannel on Channel {
    id
    can {
      transfer
    }
    is_pending_transfer
    transfer_request {
      user_to {
        id
        name
      }
      is_user_to_member
    }
    visibility
  }
`;
