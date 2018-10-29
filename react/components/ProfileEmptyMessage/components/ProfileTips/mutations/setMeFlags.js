import gql from 'graphql-tag';

import profileTipsFragment from 'react/components/ProfileEmptyMessage/components/ProfileTips/fragments/profileTips';

export default gql`
  mutation setMeFlags($flags: [MeFlagInput]!) {
    set_me_flags(input: {flags: $flags}) {
      me {
        ... ProfileTips
      }
    }
  }
  ${profileTipsFragment}
`;
