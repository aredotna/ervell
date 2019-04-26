import gql from 'graphql-tag'

import channelFragment from 'v2/components/Cell/components/Konnectable/components/Channel/fragments/channel'
import textFragment from 'v2/components/Cell/components/Konnectable/components/Text/fragments/text'
import pendingBlockFragment from 'v2/components/Cell/components/Konnectable/components/PendingBlock/fragments/pendingBlock'
import imageFragment from 'v2/components/Cell/components/Konnectable/components/Image/fragments/image'
import linkFragment from 'v2/components/Cell/components/Konnectable/components/Link/fragments/link'
import embedFragment from 'v2/components/Cell/components/Konnectable/components/Embed/fragments/embed'
import attachmentFragment from 'v2/components/Cell/components/Konnectable/components/Attachment/fragments/attachment'
import metadataFragment from 'v2/components/Cell/components/Konnectable/components/Metadata/fragments/metadata'
import blokkOverlayFragment from 'v2/components/Cell/components/Konnectable/components/BlokkOverlay/fragments/blokkOverlay'

export default gql`
  fragment KonnectableCell on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on ConnectableInterface {
      href
    }
    ... on Block {
      counts {
        comments
      }
    }
    ...Channel
    ...Text
    ...Image
    ...Link
    ...Embed
    ...Attachment
    ...PendingBlock
    ...KonnectableMetadata
    ...BlokkOverlay
  }
  ${channelFragment}
  ${textFragment}
  ${imageFragment}
  ${linkFragment}
  ${embedFragment}
  ${attachmentFragment}
  ${metadataFragment}
  ${blokkOverlayFragment}
  ${pendingBlockFragment}
`
