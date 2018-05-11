import gql from 'graphql-tag';

export default gql`
  fragment ProfileMetadataSort on User {
    href
  }
`;
