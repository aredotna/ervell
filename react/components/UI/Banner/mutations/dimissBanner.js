import gql from 'graphql-tag';

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
`;
