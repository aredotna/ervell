import { gql } from '@apollo/client'

export default gql`
  mutation dismissMonthlyBannerMutation($banner: BannerEnum!) {
    dismiss_banner(input: { banner: $banner }) {
      me {
        __typename
        id
        banner
      }
    }
  }
`
