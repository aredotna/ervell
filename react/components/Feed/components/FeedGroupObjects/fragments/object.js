import gql from 'graphql-tag';

import channelFragment from 'react/components/Cell/components/Konnectable/components/Channel/fragments/channel';
import textFragment from 'react/components/Cell/components/Konnectable/components/Text/fragments/text';
import imageFragment from 'react/components/Cell/components/Konnectable/components/Image/fragments/image';
import linkFragment from 'react/components/Cell/components/Konnectable/components/Link/fragments/link';
import embedFragment from 'react/components/Cell/components/Konnectable/components/Embed/fragments/embed';
import attachmentFragment from 'react/components/Cell/components/Konnectable/components/Attachment/fragments/attachment';
import identifiableCellFragment from 'react/components/Cell/components/Identifiable/fragments/identifiableCell';
import metadataFragment from 'react/components/Cell/components/Konnectable/components/Metadata/fragments/metadata';
import blokkOverlayFragment from 'react/components/Cell/components/Konnectable/components/BlokkOverlay/fragments/blokkOverlay';

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
    ... Channel
    ... Text
    ... Image
    ... Link
    ... Embed
    ... Attachment
    ... KonnectableMetadata
    ... BlokkOverlay
    ... IdentifiableCell
  }
  ${channelFragment}
  ${textFragment}
  ${imageFragment}
  ${linkFragment}
  ${embedFragment}
  ${attachmentFragment}
  ${metadataFragment}
  ${blokkOverlayFragment}
  ${identifiableCellFragment}
`;
