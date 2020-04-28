import gql from 'graphql-tag'

export default gql`
  query IsSpiderRequestingQuery {
    sharify @client {
      isSpiderRequesting: IS_SPIDER
    }
  }
`
