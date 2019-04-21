import gql from 'graphql-tag'

export default gql`
  query {
    currentRoute @client {
      protocol
      slashes
      auth
      host
      port
      hostname
      hash
      search
      query
      pathname
      path
      href
    }
  }
`
