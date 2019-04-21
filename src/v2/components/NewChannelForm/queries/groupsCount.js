import gql from 'graphql-tag';

export default gql`
  query GroupsCountQuery {
    me {
      __typename
      id
      counts {
        groups
      }
    }
  }
`;
