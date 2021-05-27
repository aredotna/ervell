import { gql } from '@apollo/client'

import konnectableChannelFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableChannel/fragments/konnectableChannel'
import konnectableTextFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableText/fragments/konnectableText'
import konnectableImageFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableImage/fragments/konnectableImage'
import konnectableLinkFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableLink/fragments/konnectableLink'
import konnectableEmbedFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableEmbed/fragments/konnectableEmbed'
import konnectableAttachmentFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableAttachment/fragments/konnectableAttachment'
import konnectableMetadataFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableMetadata/fragments/konnectableMetadata'
import konnectableBlockOverlayFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableBlockOverlay/fragments/konnectableBlockOverlay'
import identifiableCellFragment from 'v2/components/Cell/components/Identifiable/fragments/identifiableCell'

export default gql`
  fragment Object on DeedKkind {
    __typename
    ... on ConnectableInterface {
      href
    }
    ... on Block {
      counts {
        comments
      }
    }
    ...KonnectableChannel
    ...KonnectableText
    ...KonnectableImage
    ...KonnectableLink
    ...KonnectableEmbed
    ...KonnectableAttachment
    ...KonnectableMetadata
    ...KonnectableBlockOverlay
    ...IdentifiableCell
  }
  ${konnectableChannelFragment}
  ${konnectableTextFragment}
  ${konnectableImageFragment}
  ${konnectableLinkFragment}
  ${konnectableEmbedFragment}
  ${konnectableAttachmentFragment}
  ${konnectableMetadataFragment}
  ${konnectableBlockOverlayFragment}
  ${identifiableCellFragment}
`
