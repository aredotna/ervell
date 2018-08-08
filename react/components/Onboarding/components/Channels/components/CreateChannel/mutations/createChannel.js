import gql from 'graphql-tag';

export default gql`
  mutation createChannelMutation($title: String!, $visibility: ChannelVisibility = PRIVATE) {
    create_channel(input: { title: $title, visibility: $visibility }) {
      channel {
        href
      }
    }
  }
`;
