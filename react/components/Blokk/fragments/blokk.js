import gql from 'graphql-tag';

import channelFragment from 'react/components/Blokk/components/Channel/fragments/channel';
import textFragment from 'react/components/Blokk/components/Text/fragments/text';
import imageFragment from 'react/components/Blokk/components/Image/fragments/image';
import linkFragment from 'react/components/Blokk/components/Link/fragments/link';
import embedFragment from 'react/components/Blokk/components/Embed/fragments/embed';
import attachmentFragment from 'react/components/Blokk/components/Attachment/fragments/attachment';
import modelMetadataFragment from 'react/components/Blokk/components/Metadata/fragments/modelMetadata';
import connectableMetadataFragment from 'react/components/Blokk/components/Metadata/fragments/connectableMetadata';
import connectableBlokkOverlayFragment from 'react/components/Blokk/components/BlokkOverlay/fragments/connectableBlokkOverlay';
import modelBlokkOverlayFragment from 'react/components/Blokk/components/BlokkOverlay/fragments/modelBlokkOverlay';
import channelOverlayFragment from 'react/components/Blokk/components/ChannelOverlay/fragments/channelOverlay';

export default gql`
  fragment Blokk on Konnectable {
    __typename
    ... Channel
    ... Text
    ... Image
    ... Link
    ... Embed
    ... Attachment
    ... ConnectableMetadata
    ... ModelMetadata
    ... ConnectableBlokkOverlay
    ... ModelBlokkOverlay
    ... ChannelOverlay
  }
  ${channelFragment}
  ${textFragment}
  ${imageFragment}
  ${linkFragment}
  ${embedFragment}
  ${attachmentFragment}
  ${modelMetadataFragment}
  ${connectableMetadataFragment}
  ${connectableBlokkOverlayFragment}
  ${modelBlokkOverlayFragment}
  ${channelOverlayFragment}
`;
