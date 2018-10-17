import gql from 'graphql-tag';

import profileChannelsFragment from 'react/components/ProfileChannels/fragments/profileChannels';

export default gql`
  query ProfileChannels($id: ID!, $page: Int, $per: Int, $sort: SearchSorts) {
    identity(id: $id) {
      identifiable {
        __typename
        ... ProfileChannels
      }
    }
  }
  ${profileChannelsFragment}
`;
