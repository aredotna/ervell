import gql from 'graphql-tag';

export default gql`
  fragment GroupSearchResult on Group {
    __typename
    id
    name
    counts {
      users
    }
  }
`;
