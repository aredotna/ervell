import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import channelMetadataFragment from 'react/components/ChannelMetadata/fragments/channelMetadata';

import { getChannelOnboardingCookie, expireChannelOnboardingCookie } from 'react/components/Onboarding/util/channelOnboardingCookieManager';

import Modal from 'react/components/UI/Modal';
import ModalDialog from 'react/components/UI/ModalDialog';
import IntroduceChannel from 'react/components/Onboarding/components/Channels/components/IntroduceChannel';

const Dialog = styled(ModalDialog).attrs({
  width: 'auto',
  height: 'auto',
  maxHeight: '100%',
  maxWidth: '100%',
})`
`;

const channelOnboardingChecker = (WrappedChannelComponent) => {
  class ChannelOnboardingChecker extends React.Component {
    componentDidMount() {
      const { data: { channel } } = this.props;
      const id = channel && channel.id;

      if (getChannelOnboardingCookie(id)) {
        const modal = new Modal(IntroduceChannel, {}, { Dialog });
        modal.open();

        expireChannelOnboardingCookie(id);
      }
    }

    render() {
      return <WrappedChannelComponent {...this.props} />;
    }
  }

  ChannelOnboardingChecker.propTypes = {
    data: PropTypes.shape({
      channel: propType(channelMetadataFragment),
    }).isRequired,
  };

  return ChannelOnboardingChecker;
};

export default channelOnboardingChecker;
