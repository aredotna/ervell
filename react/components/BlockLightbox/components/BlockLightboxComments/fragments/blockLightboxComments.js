import gql from 'graphql-tag';

import blockLightboxCommentFragment from 'react/components/BlockLightbox/components/BlockLightboxComment/fragments/blockLightboxComment';

export default gql`
  fragment BlockLightboxComments on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on ConnectableInterface {
      comments {
        ...BlockLightboxComment
      }
    }
  }
  ${blockLightboxCommentFragment}
`;
