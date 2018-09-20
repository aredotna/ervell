import gql from 'graphql-tag';

export default gql`
  fragment ProfileGroupUserList on Identifiable {
    ... on Group {
      id: slug
      users {
        id
        label: name
        href
      }
    }
  }
`;
