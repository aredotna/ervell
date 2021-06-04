import { gql } from '@apollo/client'

export default gql`
  query IsSpiderRequestingQuery {
    sharify @client {
      isSpiderRequesting: IS_SPIDER
    }
  }
`
