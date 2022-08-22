import { gql } from '@apollo/client'

export default gql`
  fragment AdvancedQuickSearchResultBlock on SsearchResult {
    __typename
    ... on Model {
      id
    }
    ... on ConnectableInterface {
      title
      href
      user {
        id
        name
      }
    }
    ... on Text {
      content(format: MARKDOWN)
    }
    ... on Embed {
      src: resized_image_url(
        width: 35
        height: 35
        quality: 90
        fallback_format: PNG
      )
    }

    ... on Image {
      src: resized_image_url(
        width: 35
        height: 35
        quality: 90
        fallback_format: PNG
      )
    }
    ... on Link {
      src: resized_image_url(
        width: 35
        height: 35
        quality: 90
        fallback_format: PNG
      )
    }
    ... on Attachment {
      src: resized_image_url(
        width: 35
        height: 35
        quality: 90
        fallback_format: PNG
      )
    }
  }
`
