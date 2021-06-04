import { gql } from '@apollo/client'

export default gql`
  query ProfileUiState {
    cookies @client {
      view: get(name: "Profile--view")
      filter: get(name: "Profile--filter")
      sort: get(name: "Profile--sort")
      type: get(name: "Profile--type")
    }
  }
`
