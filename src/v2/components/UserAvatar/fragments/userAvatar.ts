import { gql } from '@apollo/client'

export default gql`
  fragment UserAvatar on UserInterface {
    href
    initials
    avatar(size: LARGE)
  }
`
