import gql from 'graphql-tag';

import mutableFragment from 'react/components/MuteButton/fragments/mutable';

export default gql`
  query MuteQuery($id: ID!, $type: MutableTypeEnum!) {
    mutable(id: $id, type: $type) {
      ...Mutable
    }
  }
  ${mutableFragment}
`;
