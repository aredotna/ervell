import gql from 'graphql-tag';

import channelFragment from 'react/components/Blokk/components/Channel/fragments/channel';
import textFragment from 'react/components/Blokk/components/Text/fragments/text';
import imageFragment from 'react/components/Blokk/components/Image/fragments/image';
import linkFragment from 'react/components/Blokk/components/Link/fragments/link';
import embedFragment from 'react/components/Blokk/components/Embed/fragments/embed';
import attachmentFragment from 'react/components/Blokk/components/Attachment/fragments/attachment';
import userFragment from 'react/components/Blokk/components/User/fragments/user';
import modelMetadataFragment from 'react/components/Blokk/components/Metadata/fragments/modelMetadata';
import connectableMetadataFragment from 'react/components/Blokk/components/Metadata/fragments/connectableMetadata';
import connectableBlokkOverlayFragment from 'react/components/Blokk/components/BlokkOverlay/fragments/connectableBlokkOverlay';
import modelBlokkOverlayFragment from 'react/components/Blokk/components/BlokkOverlay/fragments/modelBlokkOverlay';

export default gql`
  fragment Object on DeedKkind {
    __typename
    ... Channel
    ... Text
    ... Image
    ... Link
    ... Embed
    ... Attachment
    ... User
    ... ConnectableMetadata
    ... ModelMetadata
    ... ConnectableBlokkOverlay
    ... ModelBlokkOverlay
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
  ${userFragment}
`;
