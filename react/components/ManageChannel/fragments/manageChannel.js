import gql from 'graphql-tag';

export default gql`
  fragment ManageChannel on Channel {
    id: slug
    href
    title
    description(format: MARKDOWN)
    visibility
    can {
      export
    }
  }
`;
