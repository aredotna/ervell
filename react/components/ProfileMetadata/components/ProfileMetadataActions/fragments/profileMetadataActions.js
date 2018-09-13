import gql from 'graphql-tag';

export default gql`
  fragment ProfileMetadataActions on Identifiable {
    ... on User {
      id: slug
      can {
        follow
        manage
      }
    }

    ... on Group {
      id: slug
      can {
        follow
        manage
      }
    }
  }
`;
