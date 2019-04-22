import gql from 'graphql-tag';

import profileChannelsFragment from 'v2/components/ProfileChannels/fragments/profileChannels';

export default gql`
  query ProfileChannels($id: ID!, $page: Int, $per: Int) {
    identity(id: $id) {
      identifiable {
        __typename
        ...ProfileChannels
      }
    }
  }
  ${profileChannelsFragment}
`;
