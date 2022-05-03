import gql from 'graphql-tag'

export default gql`
  mutation flagContentMutation(
    $id: ID!
    $type: BaseConnectableTypeEnum!
    $category: FlagCategoryEnum!
  ) {
    flag_content(input: { id: $id, type: $type, category: $category }) {
      status
    }
  }
`
