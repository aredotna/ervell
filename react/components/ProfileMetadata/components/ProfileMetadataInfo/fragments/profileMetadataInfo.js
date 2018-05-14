import gql from 'graphql-tag';

export default gql`
  fragment ProfileMetadataInfo on User {
    href
    about: bio(format: HTML)
    counts {
      followers
      following
    }
  }
`;
