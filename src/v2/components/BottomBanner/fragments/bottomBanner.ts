import { gql } from '@apollo/client'

export default gql`
  fragment BottomBanner on Me {
    __typename
    id
    banner
  }
`
