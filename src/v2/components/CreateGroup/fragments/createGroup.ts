import { gql } from '@apollo/client'

export default gql`
  fragment CreateGroup on Me {
    __typename
    id
    has_seen_new_group_explanation: flag(name: "has_seen_new_group_explanation")
  }
`
