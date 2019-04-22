import gql from 'graphql-tag';

export default gql`
  query IsLoggedInQuery {
    loginStatus @client {
      isLoggedIn
    }
  }
`;
