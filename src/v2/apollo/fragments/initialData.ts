import { gql } from '@apollo/client'

export default gql`
  fragment InitialAppDataFragment on Query {
    currentRoute {
      protocol
      slashes
      auth
      host
      port
      hostname
      hash
      search
      query
      pathname
      path
      href
    }
    loginStatus {
      isLoggedIn
    }
    cookies {
      get
    }
    serializedMe {
      id
      initials
      name
      avatar
      authentication_token
      is_premium
      is_lifetime_premium
      is_supporter
      slug
      hide_notification_count
    }
    sharify {
      get
      IS_SPIDER
      IS_OUTSIDE_MAIN_ROUTER
      THEME
    }
  }
`
