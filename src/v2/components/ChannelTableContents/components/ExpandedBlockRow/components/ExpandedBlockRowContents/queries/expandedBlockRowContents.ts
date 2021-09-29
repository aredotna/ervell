import { gql } from '@apollo/client'

export default gql`
  query ExpandedBlockRowContents($id: ID!) {
    block: blokk(id: $id) {
      ... on Model {
        id
        created_at_unix_time: created_at(format: "%s")
        created_at_timestamp: created_at
        created_at(relative: true)
        updated_at(relative: true)
        updated_at_timestamp: updated_at
      }

      ... on Text {
        content(format: HTML)
      }

      ... on Image {
        thumb_url: image_url(size: THUMB)
        image_url(size: LARGE)
        original_image_url: image_url(size: ORIGINAL)
      }

      ... on Link {
        id
        title
        source_url
        image_url(size: ORIGINAL)
        image_updated_at(format: "%m/%d/%y")
        image_updated_at_unix_time: image_updated_at(format: "%s")
        source {
          title
          url
          provider_name
          provider_url
        }
      }
    }
  }
`
