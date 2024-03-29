import { gql } from '@apollo/client'

import fullBlockActionsFragment from 'v2/components/FullBlock/components/FullBlockActions/fragments/fullBlockActions'
import manageBlockFragment from 'v2/components/ManageBlock/fragments/manageBlock'

export default gql`
  query ExpandedBlockMetadata($id: ID!) {
    block: blokk(id: $id) {
      ... on Model {
        id
        created_at_unix_time: created_at(format: "%s")
        created_at_timestamp: created_at
        created_at(relative: true)
        updated_at(relative: true)
        updated_at_timestamp: updated_at
      }
      ... on ConnectableInterface {
        title
        description(format: HTML)
        href
        user {
          __typename
          id
          name
          href
        }
      }
      ... on Block {
        can {
          manage
          comment
        }
      }

      ... on Text {
        content(format: HTML)
      }

      ... on Image {
        thumb_url: image_url(size: THUMB)
        image_url(size: LARGE)
        original_image_url: image_url(size: ORIGINAL)
      }

      ...FullBlockActions
      ...ManageBlock
    }
  }
  ${fullBlockActionsFragment}
  ${manageBlockFragment}
`
