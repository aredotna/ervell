import { gql } from '@apollo/client'

export const channelPageMetaTagsFragment = gql`
  fragment ChannelPageMetaTags on Channel {
    __typename
    id
    meta_title: title
    meta_description: description(format: MARKDOWN)
    canonical: href(absolute: true)
    is_nsfw
    image_url(size: DISPLAY)
  }
`
