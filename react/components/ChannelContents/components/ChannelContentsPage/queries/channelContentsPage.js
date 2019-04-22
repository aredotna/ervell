import gql from 'graphql-tag';

import konnectableCellFragment from 'react/components/Cell/components/Konnectable/fragments/konnectableCell';

export default gql`
  query ChannelContentsPage($id: ID!, $per: Int!, $page: Int!) {
    channel(id: $id) {
      __typename
      id
      contents: blokks(per: $per, page: $page, sort_by: POSITION, direction: DESC) {
        ...KonnectableCell
      }
    }
  }
  ${konnectableCellFragment}
`;
