import gql from 'graphql-tag';

export default gql`
  fragment EmptyOrTips on Identifiable {
    ... on User {
      __typename
      id
      created_at(format: "%Y-%m-%dT%H:%M:%S.%L%z")
      is_me
      counts {
        blocks
        channels
      }
    }
  }
`;
