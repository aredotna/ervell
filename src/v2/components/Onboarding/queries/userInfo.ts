import gql from 'graphql-tag';

export default gql`
  query UserInfoQuery {
    me {
      __typename
      slug
    }
  }
`;
