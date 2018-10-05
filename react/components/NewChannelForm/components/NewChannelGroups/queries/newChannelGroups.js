import gql from 'graphql-tag';

export default gql`
  query NewChannelGroupsQuery {
    me {
      __typename
      id
      name
      groups(page: 1, per: 25) {
        __typename
        id: slug
        name
      }
    }
  }
`;
