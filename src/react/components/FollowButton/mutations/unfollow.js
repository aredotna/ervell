import gql from 'graphql-tag';

import followableFragment from 'react/components/FollowButton/fragments/followable';

export default gql`
  mutation UnfollowMutation($id: ID!, $type: FollowableTypeEnum!) {
    __typename
    unfollow(input: { id: $id, type: $type }) {
      __typename
      followable {
        ...Followable
      }
    }
  }
  ${followableFragment}
`;
