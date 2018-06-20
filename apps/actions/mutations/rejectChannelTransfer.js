import gql from 'graphql-tag';

export default gql`
  mutation rejectChannelTransferMutation($token: String!){
    reject_channel_transfer(input: { token: $token }) {
      channel {
        title
        href
      }
    }
  }
`;
