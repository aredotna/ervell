import gql from 'graphql-tag';

import bottomBannerFragment from 'react/components/BottomBanner/fragments/bottomBanner';
import notificationCountFragment from 'react/components/TopBar/components/NotificationCount/fragments/notificationCount';

export default gql`
  query GlobalNavElements {
    me {
      __typename
      id
      ...BottomBanner
      ...NotificationCount
    }
  }
  ${bottomBannerFragment}
  ${notificationCountFragment}
`;
