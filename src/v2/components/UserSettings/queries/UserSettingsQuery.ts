import gql from 'graphql-tag'

export default gql`
  query MySettings {
    me {
      __typename
      id
      first_name
      last_name
      email
      slug
      unconfirmed_email
      bio
      is_premium
      home_path
      can {
        edit_profile_description
      }
      settings {
        receive_email
        receive_tips_emails
        exclude_from_indexes
        receive_newsletter
        show_nsfw
      }
    }
  }
`
