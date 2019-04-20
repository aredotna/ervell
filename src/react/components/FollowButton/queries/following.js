import gql from 'graphql-tag';

import followableFragment from 'react/components/FollowButton/fragments/followable';

export default gql`
  query FollowQuery($id: ID!, $type: FollowableTypeEnum) {
    followable(id: $id, type: $type) {
      ...Followable
    }
  }
  ${followableFragment}
`;
