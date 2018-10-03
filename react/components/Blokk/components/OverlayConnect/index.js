import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { outlineBorder } from 'react/styles/mixins';

import Box from 'react/components/UI/Box';
import { DividerButton } from 'react/components/UI/Buttons';
import ConnectionSelection from 'react/components/ConnectionSelection';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  padding: ${x => x.theme.space[4]};
  border: 1px solid ${x => x.theme.colors.gray.regular};

  &:after {
    margin: -1px;
    ${outlineBorder()}
  }
`;

export default class OverlayConnect extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['CHANNEL', 'BLOCK']).isRequired,
    onClose: PropTypes.func.isRequired,
  }
  render() {
    const { id, type, onClose } = this.props;

    return (
      <Container>
        <Box flex="1">
          <ConnectionSelection id={id} type={type} isOutlined={false} />
        </Box>

        <DividerButton f={3} onClick={onClose}>
          Close
        </DividerButton>
      </Container>
    );
  }
}
