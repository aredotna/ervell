import { gql } from '@apollo/client'

export default gql`
  fragment KonnectableText on Text {
    id
    title
    href
    content(format: HTML)
  }
`
