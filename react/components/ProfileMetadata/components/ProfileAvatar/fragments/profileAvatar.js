import gql from 'graphql-tag';

export default gql`
  fragment ProfileAvatar on Identifiable {
    ... on Group {
      __typename
      id
      avatar(size: LARGE)
      can {
        update
      }
    }
  }
`;
