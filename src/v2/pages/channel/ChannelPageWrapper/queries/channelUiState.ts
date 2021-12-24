import { gql } from '@apollo/client'

export default gql`
  query ChannelUiState($viewName: String!) {
    cookies @client {
      view: get(name: $viewName)
    }
  }
`
