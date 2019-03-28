import gql from 'graphql-tag';

export default gql`
  fragment CustomBadge on Me {
    __typename
    id
    custom_badge(size: LARGE)
    can {
      set_custom_badge
    }
  }
`;
