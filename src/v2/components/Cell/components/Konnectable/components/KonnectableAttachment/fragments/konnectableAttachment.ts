import gql from 'graphql-tag'

export default gql`
  fragment KonnectableAttachment on Attachment {
    id
    title
    href
    src: image_url(size: DISPLAY)
    file_extension
  }
`
