import gql from 'graphql-tag';

import userFragment from 'react/components/Blokk/components/User/fragments/user';

export default gql`
  query User($id: ID!) {
    user(id: $id) {
      ...User
    }
  }
  ${userFragment}
`;
