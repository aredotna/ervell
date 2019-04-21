import gql from 'graphql-tag'

export default gql`
  query IsSpiderRequestingQuery {
    sharify @client {
      isSpiderRequesting: get(name: "IS_SPIDER")
    }
  }
`
