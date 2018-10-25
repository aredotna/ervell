import gql from 'graphql-tag';

export default gql`
  fragment CollaboratorLink on Member {
    __typename
    ... on User {
      id: slug
      name
      href
    }
    ... on Group {
      id: slug
      name
      href
      description(format: MARKDOWN)
      visibility
    }
  }
`;
