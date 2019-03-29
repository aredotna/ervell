import gql from 'graphql-tag';

import customBadgeFragment from 'react/components/CustomBadgeUploader/fragments/customBadge';

export default gql`
  query BadgeCheck {
    me {
      ...CustomBadge
    }
  }
  ${customBadgeFragment}
`;
