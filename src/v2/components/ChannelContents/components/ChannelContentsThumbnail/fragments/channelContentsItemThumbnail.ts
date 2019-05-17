import gql from 'graphql-tag'

export const channelContentsItemThumbnailFragment = gql`
  fragment ChannelContentsItemThumbnail on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on Image {
      meta_image: image_url(size: DISPLAY)
    }
    ... on Link {
      meta_image: image_url(size: DISPLAY)
    }
    ... on Embed {
      meta_image: image_url(size: DISPLAY)
    }
    ... on Attachment {
      meta_image: image_url(size: DISPLAY)
    }
  }
`
