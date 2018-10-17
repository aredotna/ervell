import gql from 'graphql-tag';

import profileContentsFragment from 'react/components/ProfileContents/fragments/profileContents';

export default gql`
  query ProfileContents($id: ID!, $type: ConnectableTypeEnum, $page: Int, $per: Int, $sort: SearchSorts) {
    identity(id: $id) {
      identifiable {
        __typename
        ... ProfileContents
      }
    }
  }
  ${profileContentsFragment}
`;
