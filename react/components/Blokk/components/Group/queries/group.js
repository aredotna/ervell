import gql from 'graphql-tag';

import groupFragment from 'react/components/Blokk/components/Group/fragments/group';

export default gql`
  query Group($id: ID!) {
    group(id: $id) {
      ...Group
    }
  }
  ${groupFragment}
`;
