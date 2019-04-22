import gql from 'graphql-tag';

export default gql`
  query ProfileUiState {
    cookies @client {
      view: get(name: "Profile--view")
      filter: get(name: "Profile--filter")
      sort: get(name: "Profile--sort")
    }
  }
`;
