import gql from 'graphql-tag';

export default gql`
  query SearchUiState {
    cookies @client {
      view: get(name: "Search--view")
      sort: get(name: "Search--sort")
    }
  }
`;
