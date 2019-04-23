import gql from 'graphql-tag';

export default gql`
  fragment PrimarySearchResult on QuickSearchResult {
    __typename
    ... on User {
      id
      label: name
      href
    }
    ... on Group {
      id
      label: name
      href
      visibility
    }
    ... on Channel {
      id
      label: title
      href
      visibility
      owner {
        __typename
        ... on User {
          id
          name
        }
        ... on Group {
          id
          name
          visibility
        }
      }
    }
  }
`;
