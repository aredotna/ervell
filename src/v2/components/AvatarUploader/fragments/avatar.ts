import { gql } from '@apollo/client'

export default gql`
  fragment Avatar on Me {
    __typename
    id
    avatar(size: LARGE)
  }
`
