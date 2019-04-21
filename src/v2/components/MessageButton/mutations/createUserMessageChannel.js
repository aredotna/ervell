import gql from 'graphql-tag';

export default gql`
  mutation createUserMessageChannelMutation($id: ID!) {
    create_user_message_channel(input: { id: $id }) {
      channel {
        href
      }
    }
  }
`;
