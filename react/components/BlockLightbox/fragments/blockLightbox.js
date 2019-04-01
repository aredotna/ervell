import gql from 'graphql-tag';

import blockLightboxMetadataPaneFragment from 'react/components/BlockLightbox/components/BlockLightboxMetadataPane/fragments/blockLightboxMetadataPane';
import blockLightboxContentPaneFragment from 'react/components/BlockLightbox/components/BlockLightboxContentPane/fragments/blockLightboxContentPane';

export default gql`
  fragment BlockLightbox on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on ConnectableInterface {
      title
    }
    ...BlockLightboxContentPane
    ...BlockLightboxMetadataPane
  }
  ${blockLightboxContentPaneFragment}
  ${blockLightboxMetadataPaneFragment}
`;
