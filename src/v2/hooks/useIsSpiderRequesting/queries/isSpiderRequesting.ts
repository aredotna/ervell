import gql from 'graphql-tag'

export default gql`
  query IsSpiderRequestingQueryHook {
    sharify @client {
      isSpiderRequesting: IS_SPIDER
    }
  }
`
