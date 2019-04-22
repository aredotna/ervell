import gql from 'graphql-tag';

import identifiableCellFragment from 'v2/components/Cell/components/Identifiable/fragments/identifiableCell';
import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell';

export default gql`
  fragment GroupProfileFollowers on Group {
    __typename
    id
    followers(page: $page, per: $per) {
      ...IdentifiableCell
      ...KonnectableCell
    }
  }
  ${identifiableCellFragment}
  ${konnectableCellFragment}
`;
