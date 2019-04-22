import gql from 'graphql-tag';

import profileChannelSearchFragment from 'react/components/ProfileChannels/fragments/profileChannelSearch';

export default gql`
  query ProfileChannels($id: ID!, $page: Int, $per: Int, $sort: SearchSorts, $q: String, $seed: Int) {
    identity(id: $id) {
      identifiable {
        __typename
        ... ProfileChannelSearch
      }
    }
  }
  ${profileChannelSearchFragment}
`;
