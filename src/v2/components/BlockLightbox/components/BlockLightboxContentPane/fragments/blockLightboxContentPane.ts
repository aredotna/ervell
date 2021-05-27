import { gql } from '@apollo/client'

import blockLightboxImageFragment from 'v2/components/BlockLightbox/components/BlockLightboxImage/fragments/blockLightboxImage'
import blockLightboxTextFragment from 'v2/components/BlockLightbox/components/BlockLightboxText/fragments/blockLightboxText'
import blockLightboxLinkFragment from 'v2/components/BlockLightbox/components/BlockLightboxLink/fragments/blockLightboxLink'
import blockLightboxAttachmentFragment from 'v2/components/BlockLightbox/components/BlockLightboxAttachment/fragments/blockLightboxAttachment'
import blockLightboxEmbedFragment from 'v2/components/BlockLightbox/components/BlockLightboxEmbed/fragments/blockLightboxEmbed'

export default gql`
  fragment BlockLightboxContentPane on Konnectable {
    ...BlockLightboxImage
    ...BlockLightboxText
    ...BlockLightboxLink
    ...BlockLightboxAttachment
    ...BlockLightboxEmbed
  }
  ${blockLightboxImageFragment}
  ${blockLightboxTextFragment}
  ${blockLightboxLinkFragment}
  ${blockLightboxAttachmentFragment}
  ${blockLightboxEmbedFragment}
`
