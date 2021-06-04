import { gql } from '@apollo/client'

export default gql`
  query MentionTextareaUserSuggestions($query: String!) {
    suggestions: searches {
      users: collaborators(query: $query, limit: 4, types: USER) {
        ... on User {
          id: slug
          label: name
        }
        ... on Group {
          id: slug
          label: name
        }
      }
    }
  }
`
