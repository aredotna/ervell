import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WithLoginStatus from 'react/hocs/WithLoginStatus';

import { FilledButton } from 'react/components/UI/Buttons';
import OverlayConnect from 'react/components/Blokk/components/OverlayConnect';

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const OverlayButton = styled(FilledButton).attrs({
  f: 4,
  mx: 4,
  px: 0,
  py: 6,
})`
  display: flex;
  flex: 1;
  justify-content: center;
`;

class BlokkOverlay extends Component {
  static propTypes = {
    blokk: PropTypes.shape({ /* TODO */ }).isRequired,
    onOverlay: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  state = {
    mode: 'resting',
  }

  openSource = (e) => {
    e.preventDefault();

    const { blokk: { source: { url: href } } } = this.props;

    Object.assign(document.createElement('a'), { target: '_blank', href }).click();
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
    const { blokk: { id, source } } = this.props;

    return (
      <Container>
        {mode === 'resting' && source && source.url &&
          <OverlayButton onClick={this.openSource}>
            Source
          </OverlayButton>
        }

        {mode === 'resting' &&
          <OverlayButton onClick={this.openConnect}>
            Connect &rarr;
          </OverlayButton>
        }

        {mode === 'overlay' &&
          <OverlayConnect
            id={id}
            type="BLOCK"
            onClose={this.closeConnect}
          />
        }
      </Container>
    );
  }
}

export default WithLoginStatus(BlokkOverlay);
