import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

export default class BlokkOverlay extends Component {
  static propTypes = {
    blokk: PropTypes.shape({ /* TODO */ }).isRequired,
    onOverlay: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
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
    this.setState({ mode: 'overlay' });
    this.props.onOverlay();
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
          <FilledButton px={7} py={6} f={4} onClick={this.openSource}>
            Source
          </FilledButton>
        }

        {mode === 'resting' &&
          <FilledButton px={7} py={6} f={4} onClick={this.openConnect}>
            Connect &rarr;
          </FilledButton>
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
