import gql from 'graphql-tag';

export default gql`
  fragment QuickSearchResult on QuickSearchResult {
    __typename
    ... on Channel {
      id
      title
      href
      visibility
      user {
        name
      }
    }
    ... on User {
      id
      name
      href
    }
    ... on Group {
      id
      name
      href
      visibility
    }
  }
`;
