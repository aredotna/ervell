import gql from 'graphql-tag';

import konnectableFragment from 'react/components/Cell/components/Konnectable/fragments/konnectable';

export default gql`
  query Blokk($id: ID!) {
    blokk(id: $id) {
      ... Konnectable
    }
  }
  ${konnectableFragment}
`;
