import gql from 'graphql-tag';

export default gql`
  fragment ProfileBadge on User {
    badge
    custom_badge(size: LARGE)
  }
`;
