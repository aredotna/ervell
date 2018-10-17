import gql from 'graphql-tag';

import profileChannelIndexFragment from 'react/components/ProfileChannelIndex/fragments/profileChannelIndex';

export default gql`
  query ProfileChannelIndex($id: ID!) {
    user(id: $id) {
      ... ProfileChannelIndex
    }
  }
  ${profileChannelIndexFragment}
`;
