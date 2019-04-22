import gql from 'graphql-tag';

import customBadgeFragment from 'v2/components/CustomBadgeUploader/fragments/customBadge';

export default gql`
  query BadgeCheck {
    me {
      ...CustomBadge
    }
  }
  ${customBadgeFragment}
`;
