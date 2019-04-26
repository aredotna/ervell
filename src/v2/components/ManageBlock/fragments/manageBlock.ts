import gql from 'graphql-tag'

export default gql`
  fragment ManageBlock on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on ConnectableInterface {
      editable_title: title
      editable_description: description(format: MARKDOWN)
    }
    ... on Text {
      editable_content: content(format: MARKDOWN)
    }
  }
`
