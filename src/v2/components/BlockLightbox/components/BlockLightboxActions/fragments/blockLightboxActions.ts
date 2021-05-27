import { gql } from '@apollo/client'

import blockLightboxShareFragment from 'v2/components/BlockLightbox/components/BlockLightboxShare/fragments/blockLightboxShare'

export default gql`
  fragment BlockLightboxActions on Konnectable {
    __typename
    ... on Image {
      find_original_url
      downloadable_image: resized_image_url(downloadable: true)
    }
    ... on Text {
      find_original_url
    }
    ... on ConnectableInterface {
      source {
        title
        url
      }
    }
    ... on Block {
      can {
        mute
        potentially_edit_thumbnail
        edit_thumbnail
      }
    }
    ...BlockLightboxShare
  }
  ${blockLightboxShareFragment}
`
