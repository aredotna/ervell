import { gql } from '@apollo/client'

export default gql`
  mutation UpdateAccountMutation(
    $email: String
    $first_name: String
    $last_name: String
    $show_nsfw: Boolean
    $home_path: String
    $receive_email: String
    $receive_newsletter: Boolean
    $receive_tips_emails: Boolean
    $receive_group_premium_emails: Boolean
    $receive_sunday_review_emails: Boolean
    $show_tour: Boolean
    $exclude_from_indexes: Boolean
    $bio: String
    $custom_badge_url: String
    $password: String
    $password_confirmation: String
    $hide_notification_count: Boolean
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
        receive_tips_emails: $receive_tips_emails
        receive_group_premium_emails: $receive_group_premium_emails
        receive_sunday_review_emails: $receive_sunday_review_emails
        show_tour: $show_tour
        exclude_from_indexes: $exclude_from_indexes
        password: $password
        password_confirmation: $password_confirmation
        hide_notification_count: $hide_notification_count
      }
    ) {
      me {
        id
        email
        name
        first_name
        bio
        home_path
        settings {
          receive_email
          receive_tips_emails
          receive_group_premium_emails
          receive_sunday_review_emails
          exclude_from_indexes
          receive_newsletter
          show_nsfw
        }
      }
    }
  }
`
