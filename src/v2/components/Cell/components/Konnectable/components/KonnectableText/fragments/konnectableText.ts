import gql from 'graphql-tag'

export default gql`
  fragment KonnectableText on Text {
    id
    title
    href
    content(format: HTML)
  }
`
