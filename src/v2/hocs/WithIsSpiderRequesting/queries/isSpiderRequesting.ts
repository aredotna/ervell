import gql from 'graphql-tag'

export default gql`
  query IsSpiderRequestingQuery {
    sharify @client {
      # FIXME: Where is this constant coming from?
      isSpiderRequesting: IS_SPIDER
    }
  }
`
