import gql from 'graphql-tag';

import ConnectTwitterFragment from 'react/components/ConnectTwitter/fragments/index';

export default gql`
  query ConnectTwitterQuery($per: Int, $page: Int) {
    ...ConnectTwitter
  }
  ${ConnectTwitterFragment}
`;
