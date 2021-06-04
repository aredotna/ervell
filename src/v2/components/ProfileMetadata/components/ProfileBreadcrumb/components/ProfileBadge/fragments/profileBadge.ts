import { gql } from '@apollo/client'

export default gql`
  fragment ProfileBadge on User {
    badge
    custom_badge(size: LARGE)
  }
`
