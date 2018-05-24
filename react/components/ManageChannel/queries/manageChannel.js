import gql from 'graphql-tag';

import manageChannelFragment from 'react/components/ManageChannel/fragments/manageChannel';

export default gql`
  query ManageChannelQuery($id: ID!) {
    channel(id: $id) {
      ...ManageChannel
    }
  }
  ${manageChannelFragment}
`;
