import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import blokkOverlayFragment from 'react/components/Cell/components/Konnectable/components/BlokkOverlay/fragments/blokkOverlay';

import WithLoginStatus from 'react/hocs/WithLoginStatus';

import { FilledButton } from 'react/components/UI/Buttons';
import OverlayConnect from 'react/components/Cell/components/Konnectable/components/OverlayConnect';

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
  px: 0,
  py: 6,
})`
  display: flex;
  flex: 0.46;
  justify-content: center;
`;

class BlokkOverlay extends PureComponent {
  static propTypes = {
    konnectable: propType(blokkOverlayFragment).isRequired,
    onOverlay: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  state = {
    mode: 'resting',
  }

  openSource = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { konnectable: { source: { url: href } } } = this.props;

    Object.assign(document.createElement('a'), { target: '_blank', href }).click();
  }

  openConnect = (e) => {
    e.preventDefault();
    e.stopPropagation();

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
    e.stopPropagation();

    this.setState({ mode: 'resting' });
    this.props.onClose();
  }

  render() {
    const { mode } = this.state;
    const { konnectable: { id, source } } = this.props;

    const sourceUrl = source && source.url;

    return (
      <Container>
        {mode === 'resting' && sourceUrl &&
          <OverlayButton ml={4} mr={2} onClick={this.openSource}>
            Source
          </OverlayButton>
        }

        {mode === 'resting' &&
          <OverlayButton ml={sourceUrl && 2} mr={sourceUrl && 4} onClick={this.openConnect}>
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
