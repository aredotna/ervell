import { gql } from '@apollo/client'

export default gql`
  query TopBarUiStateQuery {
    cookies @client {
      view: get(name: "TopBar--filterState")
    }
  }
`
