import gql from 'graphql-tag'

export default gql`
  query {
    sharify @client {
      isSpiderRequesting: get(name: "IS_SPIDER")
    }
  }
`
