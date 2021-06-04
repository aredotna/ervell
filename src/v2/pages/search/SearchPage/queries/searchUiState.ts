import { gql } from '@apollo/client'

export default gql`
  query SearchUiState {
    cookies @client {
      view: get(name: "Search--view")
      sort: get(name: "Search--sort")
      block_filter: get(name: "Search--block_filter")
    }
  }
`
