import { gql } from '@apollo/client'

export default gql`
  query CurrentThemeHookQuery {
    sharify @client {
      theme: THEME
    }
  }
`
