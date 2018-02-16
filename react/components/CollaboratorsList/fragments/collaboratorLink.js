import gql from 'graphql-tag';

export default gql`
  fragment CollaboratorLink on User {
    id
    name
    href
  }
`;
