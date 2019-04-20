import gql from 'graphql-tag';

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell';

export default gql`
  query ExploreContents($type: SearchType, $page: Int, $per: Int, $sort: SearchSorts, $seed: Int) {
    contents: exxplore(type: $type, page: $page, per: $per, sort_by: $sort, seed: $seed) {
      ...KonnectableCell
    }
  }
  ${konnectableCellFragment}
`;
