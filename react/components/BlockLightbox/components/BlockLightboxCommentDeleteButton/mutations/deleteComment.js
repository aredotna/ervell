import gql from 'graphql-tag';

import blockLightboxCommentsFragment from 'react/components/BlockLightbox/components/BlockLightboxComments/fragments/blockLightboxComments';

export default gql`
  mutation deleteCommentMutation($id: ID!){
    delete_comment(input: { id: $id }) {
      commentable {
        __typename
        ... on Model {
          id
        }
        ...BlockLightboxComments
      }
    }
  }
  ${blockLightboxCommentsFragment}
`;
