import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GenericButton from 'react/components/UI/GenericButton';
import ConnectionSelection from 'react/components/ConnectionSelection';

import { inputPadding } from 'react/components/UI/Inputs';

const Container = styled.div`
  position: relative;
  font-size: ${x => x.theme.fontSizesIndexed.xs};
`;

const Fieldset = styled.div`
  position: relative;
`;

const Close = styled.a.attrs({
  role: 'button',
})`
  position: absolute;
  top: 0;
  right: 100%;
  padding: ${inputPadding}; // TODO
  text-align: center;
  font-weight: bold;
  font-size: ${x => x.theme.fontSizesIndexed.xs};
  line-height: 1;
  border: 2px solid transparent;

  > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${x => x.theme.fontSizesIndexed.lg};
  }
`;

// HACK: Inputs get rendered 2px taller than buttons
// given identical params. This allows us to match them up.
const ConnectPadding = styled.span`
  display: inline-block;
  padding: 1px 0;
`;

export default class Connect extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['BLOCK', 'CHANNEL']).isRequired,
    createConnection: PropTypes.func.isRequired,
    removeConnection: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  openConnect = () => {
    this.setState({ mode: 'active' });
  }

  handleClose = () => {
    this.setState({ mode: 'resting' });
  }

  render() {
    const { mode } = this.state;
    const { id, type, ...rest } = this.props;

    return (
      <Container {...rest}>
        {mode === 'resting' &&
          <GenericButton onClick={this.openConnect} f={1}>
            <ConnectPadding>
              Connect &rarr;
            </ConnectPadding>
          </GenericButton>
        }

        {mode === 'active' &&
          <Fieldset>
            <Close onClick={this.handleClose}>
              &nbsp;
              <span>&times;</span>
            </Close>

            <ConnectionSelection id={id} type={type} />
          </Fieldset>
        }
      </Container>
    );
  }
}
