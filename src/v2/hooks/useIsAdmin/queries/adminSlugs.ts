import { gql } from '@apollo/client'

export default gql`
  query IsAdminQueryHook {
    sharify @client {
      adminSlugs: ADMIN_SLUGS
    }
  }
`
