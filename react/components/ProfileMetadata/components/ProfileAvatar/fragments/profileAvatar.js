import gql from 'graphql-tag';

export default gql`
  fragment ProfileAvatar on Identifiable {
    ... on Group {
      __typename
      id: slug
      avatar(size: SMALL)
      can {
        update
      }
    }
  }
`;
