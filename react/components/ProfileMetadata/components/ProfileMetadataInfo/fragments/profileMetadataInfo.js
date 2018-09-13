import gql from 'graphql-tag';

export default gql`
  fragment ProfileMetadataInfo on Identifiable {
    ... on User {
      href
      about: bio(format: HTML)
      counts {
        followers
        following
      }
    }

    ... on Group {
      href
      about: description(format: HTML)
      counts {
        followers
      }
    }
  }
`;
