import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Modal from 'react/components/UI/Modal/Portal';
import NewChannelForm from 'react/components/NewChannelForm';

const Button = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.5;
  }
`;

const PlusSign = styled(Box)`
  position: relative;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    background-color: ${props => props.theme.colors.gray.base};
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &:after {
    transform: translateY(-50%) rotate(90deg);
  }
}
`;

export default class NewChannelButton extends PureComponent {
  state = {
    mode: 'resting',
  }

  openModal = (e) => {
    e.preventDefault();
    this.setState({ mode: 'modal' });
  }

  closeModal = (e) => {
    if (e) e.preventDefault();
    this.setState({ mode: 'resting' });
  }

  render() {
    const { mode } = this.state;

    return (
      <React.Fragment>
        <Button onClick={this.openModal} role="button" tabIndex={0} {...this.props}>
          <PlusSign
            width="10px"
            height="10px"
            mr={[0, '0.5em']}
          />

          <Text f={3} fontWeight="bold" display={['none', 'block']}>
            New channel
          </Text>
        </Button>

        {mode === 'modal' &&
          <Modal onClose={this.closeModal}>
            <NewChannelForm onClose={this.closeModal} />
          </Modal>
        }
      </React.Fragment>
    );
  }
}
