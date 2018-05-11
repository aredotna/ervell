import gql from 'graphql-tag';

export default gql`
  fragment ProfileMetadataView on User {
    href
  }
`;
