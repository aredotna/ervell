import gql from 'graphql-tag';

import mutableFragment from 'react/components/MuteButton/fragments/mutable';

export default gql`
  mutation MuteMutation($id: ID!, $type: MutableTypeEnum!) {
    __typename
    mute(input: { id: $id, type: $type }) {
      __typename
      mutable {
        ...Mutable
      }
    }
  }
  ${mutableFragment}
`;
