import gql from 'graphql-tag';

export default gql`
  query legacyChannelData($id: ID!) {
    channel(id: $id) {
      id
      owner {
        __typename
        ... on Group {
          id
        }
        ... on User {
          id
        }
      }
      can {
        add_to
        update
      }
    }
  }
`;
