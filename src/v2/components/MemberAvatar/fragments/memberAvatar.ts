import { gql } from '@apollo/client'

export default gql`
  fragment MemberAvatar on Member {
    ... on User {
      href
      initials
      avatar(size: LARGE)
    }
    ... on Group {
      href
      initials
      avatar(size: LARGE)
    }
  }
`
