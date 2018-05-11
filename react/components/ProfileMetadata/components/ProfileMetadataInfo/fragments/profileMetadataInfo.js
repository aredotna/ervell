import gql from 'graphql-tag';

export default gql`
  fragment ProfileMetadataInfo on User {
    href
    counts {
      followers
      following
    }
  }
`;
