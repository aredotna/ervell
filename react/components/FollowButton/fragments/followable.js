import gql from 'graphql-tag';

export default gql`
  fragment Followable on FollowableType {
    __typename
    ... on User {
      id
      is_followed
      counts {
        followers
      }
    }
    ... on Channel {
      id: slug
      is_followed
      counts {
        followers
      }
    }
  }
`;
