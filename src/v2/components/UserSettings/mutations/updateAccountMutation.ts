import gql from 'graphql-tag'

export default gql`
  mutation UpdateAccountMutation(
    $email: String
    $first_name: String
    $last_name: String
    $show_nsfw: Boolean
    $home_path: String
    $receive_email: String
    $receive_newsletter: Boolean
    $show_tour: Boolean
    $exclude_from_indexes: Boolean
    $bio: String
    $custom_badge_url: String
  ) {
    update_account(
      input: {
        email: $email
        first_name: $first_name
        last_name: $last_name
        receive_email: $receive_email
        bio: $bio
        show_nsfw: $show_nsfw
        custom_badge_url: $custom_badge_url
        home_path: $home_path
        receive_newsletter: $receive_newsletter
        show_tour: $show_tour
        exclude_from_indexes: $exclude_from_indexes
      }
    ) {
      me {
        id
        email
        name
        first_name
        bio
        settings {
          receive_email
          show_nsfw
        }
      }
    }
  }
`
