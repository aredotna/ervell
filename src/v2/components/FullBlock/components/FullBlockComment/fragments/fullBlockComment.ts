import { gql } from '@apollo/client'

export default gql`
  fragment FullBlockComment on Comment {
    __typename
    id
    body(format: HTML)
    created_at(relative: true)
    user {
      __typename
      id
      name
      href
    }
    can {
      destroy
    }
  }
`
