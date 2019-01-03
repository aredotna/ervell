import gql from 'graphql-tag';

export default gql`
  fragment SelectableChannel on Channel {
    __typename
    id
    title
    visibility
    owner {
      __typename
      ... on Group {
        id
        name
      }
      ... on User {
        id
        name
      }
    }
  }
`;
