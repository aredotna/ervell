import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import channelMetadataFragment from 'react/components/ChannelMetadata/fragments/channelMetadata';
import { getChannelOnboardingCookie, expireChannelOnboardingCookie } from 'react/components/Onboarding/util/channelOnboardingCookieManager';
import Modal from 'react/components/UI/Modal';
import IntroduceChannel from 'react/components/Onboarding/components/Channels/components/IntroduceChannel';

const channelOnboardingChecker = WrappedChannelComponent => {
  class ChannelOnboardingChecker extends React.Component {
    componentDidMount() {
      const { data: { channel: { id } } } = this.props;

      if (getChannelOnboardingCookie(id)) {
        const modal = new Modal(IntroduceChannel, {}, { fitContent: true });
        modal.open();

        expireChannelOnboardingCookie(id);
      }
    }

    render() {
      return <WrappedChannelComponent {...this.props}/>;
    }
  };

  ChannelOnboardingChecker.propTypes = {
    data: PropTypes.shape({
      channel: propType(channelMetadataFragment),
    }).isRequired,
  };

  return ChannelOnboardingChecker;
}

export default channelOnboardingChecker;
