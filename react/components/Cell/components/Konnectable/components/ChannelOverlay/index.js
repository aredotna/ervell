import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import channelOverlayFragment from 'react/components/Cell/components/Konnectable/components/ChannelOverlay/fragments/channelOverlay';

import WithLoginStatus from 'react/hocs/WithLoginStatus';

import Box from 'react/components/UI/Box';
import DividerButton, { mixin as dividerButtonMixin } from 'react/components/UI/Buttons/components/DividerButton';
import FollowButton from 'react/components/FollowButton';
import OverlayConnect from 'react/components/Cell/components/Konnectable/components/OverlayConnect';

const Container = styled(Box).attrs({
  px: 5,
  pb: 0,
})`
  box-sizing: border-box;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;

  ${x => x.mode === 'overlay' && `
    top: 0;
  `}
`;

const ChannelFollowButton = styled(FollowButton)`
  ${dividerButtonMixin}
`;

class ChannelOverlay extends Component {
  static propTypes = {
    channel: propType(channelOverlayFragment).isRequired,
    onOverlay: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  state = {
    mode: 'resting',
  }

  openConnect = (e) => {
    e.preventDefault();

    const { isLoggedIn, onOverlay } = this.props;

    if (!isLoggedIn) {
      window.location = `/sign_up?redirect-to=${window.location.pathname}`;
      return null;
    }

    this.setState({ mode: 'overlay' });

    return onOverlay();
  }

  closeConnect = (e) => {
    e.preventDefault();
    this.setState({ mode: 'resting' });
    this.props.onClose();
  }

  render() {
    const { mode } = this.state;
    const { channel: { id, visibility, can } } = this.props;

    return (
      <Container mode={mode}>
        {mode === 'resting' &&
          [
            can.follow && <ChannelFollowButton
              key="follow"
              f={4}
              mr={2}
              color={`channel.${visibility}`}
              id={id}
              type="CHANNEL"
            />,

            <DividerButton
              key="connect"
              f={4}
              ml={can.follow && 2}
              color={`channel.${visibility}`}
              onClick={this.openConnect}
            >
              Connect &rarr;
            </DividerButton>,
          ]
        }

        {mode === 'overlay' &&
          <OverlayConnect
            id={id}
            type="CHANNEL"
            onClose={this.closeConnect}
          />
        }
      </Container>
    );
  }
}

export default WithLoginStatus(ChannelOverlay);
