import gql from 'graphql-tag';

import mutableFragment from 'react/components/MuteButton/fragments/mutable';

export default gql`
  mutation UnmuteMutation($id: ID!, $type: MutableTypeEnum!) {
    __typename
    unmute(input: { id: $id, type: $type }) {
      __typename
      mutable {
        ...Mutable
      }
    }
  }
  ${mutableFragment}
`;
