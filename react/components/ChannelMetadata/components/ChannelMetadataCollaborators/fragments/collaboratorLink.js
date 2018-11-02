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
      description(format: MARKDOWN)
      user {
        id: slug
        name
        href
      }
      users {
        id: slug
        name
        href
      }
      can {
        manage
        manage_users
      }
    }
  }
`;
