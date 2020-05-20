import gql from 'graphql-tag'

export default gql`
  query CurrentThemeHookQuery {
    sharify @client {
      theme: THEME
    }
  }
`
