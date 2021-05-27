import { gql } from '@apollo/client'

export default gql`
  query GroupByCodeQuery($code: String!) {
    group_by_code(code: $code) {
      id
      name
      user {
        name
        href
      }
      counts {
        channels
        users
      }
    }
  }
`
