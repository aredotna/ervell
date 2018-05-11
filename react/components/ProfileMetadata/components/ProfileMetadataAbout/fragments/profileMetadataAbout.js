import gql from 'graphql-tag';

export default gql`
  fragment ProfileMetadataAbout on User {
    about: bio(format: HTML)
  }
`;
