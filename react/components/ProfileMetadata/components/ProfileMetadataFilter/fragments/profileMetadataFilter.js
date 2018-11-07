import gql from 'graphql-tag';

export default gql`
  fragment ProfileMetadataFilter on Identifiable {
    __typename
    ... on User {
      id: slug
      name
    }
    ... on Group {
      id: slug
      name
    }
  }
`;
