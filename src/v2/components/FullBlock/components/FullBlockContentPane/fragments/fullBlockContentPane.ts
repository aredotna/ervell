import { gql } from '@apollo/client'

import fullBlockImageFragment from 'v2/components/FullBlock/components/FullBlockImage/fragments/fullBlockImage'
import fullBlockTextFragment from 'v2/components/FullBlock/components/FullBlockText/fragments/fullBlockText'
import fullBlockLinkFragment from 'v2/components/FullBlock/components/FullBlockLink/fragments/fullBlockLink'
import fullBlockAttachmentFragment from 'v2/components/FullBlock/components/FullBlockAttachment/fragments/fullBlockAttachment'
import fullBlockEmbedFragment from 'v2/components/FullBlock/components/FullBlockEmbed/fragments/fullBlockEmbed'

export default gql`
  fragment FullBlockContentPane on Konnectable {
    ...FullBlockImage
    ...FullBlockText
    ...FullBlockLink
    ...FullBlockAttachment
    ...FullBlockEmbed
  }
  ${fullBlockImageFragment}
  ${fullBlockTextFragment}
  ${fullBlockLinkFragment}
  ${fullBlockAttachmentFragment}
  ${fullBlockEmbedFragment}
`
