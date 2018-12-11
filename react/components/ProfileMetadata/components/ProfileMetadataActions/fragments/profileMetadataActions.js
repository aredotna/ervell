import gql from 'graphql-tag';

export default gql`
  fragment ProfileMetadataActions on Identifiable {
    __typename
    ... on User {
      id
      name
      can {
        follow
        manage
        message
      }
    }
    ... on Group {
      id
      can {
        follow
        manage
        manage_users
      }
    }
  }
`;
