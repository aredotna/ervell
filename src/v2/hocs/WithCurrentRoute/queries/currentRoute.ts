import { gql } from '@apollo/client'

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
