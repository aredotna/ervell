import gql from 'graphql-tag';

export default gql`
  mutation createChannelMutation($title: String!, $description: String, $visibility: ChannelVisibility){
    create_channel(input: { title: $title, description: $description, visibility: $visibility }) {
      channel {
        __typename
        id
        href
      }
    }
  }
`;
