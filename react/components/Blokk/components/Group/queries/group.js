import gql from 'graphql-tag';

import groupFragment from 'react/components/Blokk/components/User/fragments/user';

export default gql`
  query Group($id: ID!) {
    group(id: $id) {
      ...Group
    }
  }
  ${groupFragment}
`;
