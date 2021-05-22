import { gql } from '@apollo/client'

import konnectableChannelFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableChannel/fragments/konnectableChannel'
import konnectableTextFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableText/fragments/konnectableText'
import konnectableImageFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableImage/fragments/konnectableImage'
import konnectableLinkFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableLink/fragments/konnectableLink'
import konnectableEmbedFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableEmbed/fragments/konnectableEmbed'
import konnectableAttachmentFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableAttachment/fragments/konnectableAttachment'

export default gql`
  fragment KonnectableDisplay on Konnectable {
    __typename
    ... on Model {
      id
    }
    ...KonnectableChannel
    ...KonnectableText
    ...KonnectableImage
    ...KonnectableLink
    ...KonnectableEmbed
    ...KonnectableAttachment
    ...KonnectableMetadata
  }
  ${konnectableChannelFragment}
  ${konnectableTextFragment}
  ${konnectableImageFragment}
  ${konnectableLinkFragment}
  ${konnectableEmbedFragment}
  ${konnectableAttachmentFragment}
`
