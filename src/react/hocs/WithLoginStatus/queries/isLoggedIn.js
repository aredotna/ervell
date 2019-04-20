import gql from 'graphql-tag';

export default gql`
  query {
    loginStatus @client {
      isLoggedIn
    }
  }
`;
