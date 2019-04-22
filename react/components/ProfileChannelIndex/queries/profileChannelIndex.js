import gql from 'graphql-tag';

import profileChannelIndexFragment from 'react/components/ProfileChannelIndex/fragments/profileChannelIndex';

export default gql`
  query ProfileChannelIndex($id: ID!, $type: IndexedChannelsTypes) {
    identity(id: $id) {
      identifiable {
        __typename
        ... ProfileChannelIndex
      }
    }
  }
  ${profileChannelIndexFragment}
`;
