import gql from 'graphql-tag';

export default gql`
  query channel_can($id: ID!) {
    channel(id: $id) {
      id: slug
      can {
        add_to
        update
      }
    }
  }
`;
