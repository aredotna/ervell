import gql from 'graphql-tag';

export default gql`
  fragment CollaboratorLink on Member {
    __typename
    ... on User {
      id
      name
      href
    }
    ... on Group {
      id
      name
      href
      description(format: MARKDOWN)
      user {
        id
        name
        href
      }
      users {
        id
        name
        href
      }
      can {
        manage
        manage_users
      }
      visibility
    }
  }
`;
