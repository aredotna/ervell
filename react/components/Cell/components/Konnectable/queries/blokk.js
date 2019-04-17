import gql from 'graphql-tag';

import konnectableCellFragment from 'react/components/Cell/components/Konnectable/fragments/konnectableCell';

export default gql`
  query Blokk($id: ID!) {
    blokk(id: $id) {
      ...KonnectableCell
    }
  }
  ${konnectableCellFragment}
`;
