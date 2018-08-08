import gql from 'graphql-tag';

export default gql`
  mutation createChannelMutation($title: String!) {
    create_channel(input: { title: $title }) {
      channel {
        id: slug
        href
        title
      }
    }
  }
`;
