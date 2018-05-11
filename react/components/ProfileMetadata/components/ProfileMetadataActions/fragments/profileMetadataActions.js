import gql from 'graphql-tag';

export default gql`
  fragment ProfileMetadataActions on User {
    id: slug
    can {
      follow
      manage
    }
  }
`;
