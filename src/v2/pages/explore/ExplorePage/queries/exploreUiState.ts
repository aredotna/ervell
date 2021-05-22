import { gql } from '@apollo/client'

export default gql`
  query ExploreUiState {
    cookies @client {
      view: get(name: "Explore--view")
      sort: get(name: "Explore--sort")
      block_filter: get(name: "Explore--block_filter")
    }
  }
`
