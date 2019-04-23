import gql from 'graphql-tag';

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell';

export default gql`
  query ChannelContents($id: ID!, $per: Int!, $page: Int!) {
    channel(id: $id) {
      __typename
      id
      contents: blokks(
        per: $per
        page: $page
        sort_by: POSITION
        direction: DESC
      ) {
        ...KonnectableCell
      }
    }
  }
  ${konnectableCellFragment}
`;
