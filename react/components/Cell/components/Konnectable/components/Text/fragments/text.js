import gql from 'graphql-tag';

export default gql`
  fragment Text on Text {
    id
    title
    href
    content(format: HTML)
  }
`;
