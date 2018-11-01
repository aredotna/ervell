import gql from 'graphql-tag';

export default gql`
  query ProfileUiState {
    cookies @client {
      view: get(name: "Profile__view")
      filter: get(name: "Profile__filter")
      sort: get(name: "Profile__sort")
    }
  }
`;
