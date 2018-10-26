import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

const Container = styled(Box)`
  position: relative;
  border-radius: 0.25em;
`;

const Close = styled.a`
  box-sizing: border-box;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: ${x => x.theme.space[6]};
  height: ${x => x.theme.space[6]};
  padding: ${x => x.theme.space[6]};
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    display: block;
    content: '';
    width: 50%;
    height: 1px;
    top: 50%;
    left: 50%;
    background-color: ${props => themeGet(`colors.${props.color}`, props.theme.colors.gray.semiBold)(props)};
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(135deg);
  }

  &:hover:before,
  &:hover:after {
    background-color: black;
  }
`;

export default class Alert extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    color: PropTypes.string,
    isCloseable: PropTypes.bool,
  }

  static defaultProps = {
    onClose: () => {},
    color: 'gray.semiBold',
    isCloseable: true,
  }

  state = {
    mode: 'resting',
  }

  close = (e) => {
    e.preventDefault();

    const { onClose } = this.props;

    this.setState({ mode: 'closed' });

    return onClose();
  }

  render() {
    const {
      children, color, isCloseable, ...rest
    } = this.props;
    const { mode } = this.state;

    if (mode === 'closed') return '';

    return (
      <Container bg="state.editable" border="1px solid" borderColor="gray.light" py={5} px={6} {...rest}>
        <Text f={2} color={color} pr={isCloseable && 8} underlineLinks>
          {children}
        </Text>

        {isCloseable &&
          <Close role="button" tabIndex={0} onClick={this.close} color={color} />
        }
      </Container>
    );
  }
}
