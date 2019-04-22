import gql from 'graphql-tag';

export default gql`
  query ExploreUiState {
    cookies @client {
      view: get(name: "Explore--view")
      sort: get(name: "Explore--sort")
    }
  }
`;
