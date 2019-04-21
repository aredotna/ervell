import gql from 'graphql-tag'

export default gql`
  query CurrentRouteQuery {
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
