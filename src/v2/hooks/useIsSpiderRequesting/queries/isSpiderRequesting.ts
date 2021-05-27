import { gql } from '@apollo/client'

export default gql`
  query IsSpiderRequestingQueryHook {
    sharify @client {
      isSpiderRequesting: IS_SPIDER
    }
  }
`
