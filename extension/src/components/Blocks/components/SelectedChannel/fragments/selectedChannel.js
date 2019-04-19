import gql from 'graphql-tag';

export default gql`
  fragment SelectedChannel on Channel {
    __typename
    id
    title(truncate: 50)
    visibility
    owner {
      __typename
      ... on Group {
        id
        name
        visibility
      }
      ... on User {
        id
        name
      }
    }
  }
`;
