import gql from 'graphql-tag';

export default gql`
  mutation createPrivateChannelMutation($title: String!) {
    create_channel(input: { title: $title, visibility: PRIVATE }) {
      clientMutationId
      channel {
        id
      }
    }
  }
`;
