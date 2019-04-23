import gql from 'graphql-tag';

export default gql`
  mutation acceptChannelTransferMutation($token: String!) {
    accept_channel_transfer(input: { token: $token }) {
      channel_transfer_request {
        channel {
          id
          title
          href
        }
      }
    }
  }
`;
