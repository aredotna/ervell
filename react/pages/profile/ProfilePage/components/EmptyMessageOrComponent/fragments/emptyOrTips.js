import gql from 'graphql-tag';

export default gql`
  fragment EmptyOrTips on Identifiable {
    ... on User {
      __typename
      id: slug
      created_at
      is_me
      counts {
        blocks
        channels
      }
    }
  }
`;
