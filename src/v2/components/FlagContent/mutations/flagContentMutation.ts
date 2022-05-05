import { gql } from '@apollo/client'

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
