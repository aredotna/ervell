import gql from 'graphql-tag';

import blokkFragment from 'react/components/Blokk/fragments/blokk';

export default gql`
  query Blokk($id: ID!) {
    blokk(id: $id) {
      ... Blokk
    }
  }
  ${blokkFragment}
`;
