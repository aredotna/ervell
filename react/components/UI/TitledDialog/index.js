import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from 'react/components/UI/Text';
import { DividerButton } from 'react/components/UI/Buttons';

const Container = styled.form`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2em 1em 0 1em;
`;

const Body = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export default class TitledDialog extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onDone: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.node,
  }

  static defaultProps = {
    label: 'Done',
    disabled: false,
  }

  render() {
    const {
      title, children, onDone, label, disabled, ...rest
    } = this.props;

    return (
      <Container onSubmit={onDone} {...rest}>
        <Text f={4} mb={6} fontWeight="bold" textAlign="center" color="gray.medium">
          {title}
        </Text>

        <Body>
          {children}
        </Body>

        <DividerButton type="submit" disabled={disabled}>
          {label}
        </DividerButton>
      </Container>
    );
  }
}
