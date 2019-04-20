import gql from 'graphql-tag';

import blockLightboxImageFragment from 'react/components/BlockLightbox/components/BlockLightboxImage/fragments/blockLightboxImage';
import blockLightboxTextFragment from 'react/components/BlockLightbox/components/BlockLightboxText/fragments/blockLightboxText';
import blockLightboxLinkFragment from 'react/components/BlockLightbox/components/BlockLightboxLink/fragments/blockLightboxLink';
import blockLightboxAttachmentFragment from 'react/components/BlockLightbox/components/BlockLightboxAttachment/fragments/blockLightboxAttachment';
import blockLightboxEmbedFragment from 'react/components/BlockLightbox/components/BlockLightboxEmbed/fragments/blockLightboxEmbed';

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
`;
