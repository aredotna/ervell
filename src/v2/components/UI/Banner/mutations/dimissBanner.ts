import { gql } from '@apollo/client'

export default gql`
  mutation dismissBannerMutation($banner: BannerEnum!) {
    dismiss_banner(input: { banner: $banner }) {
      me {
        __typename
        id
        banner
      }
    }
  }
`
