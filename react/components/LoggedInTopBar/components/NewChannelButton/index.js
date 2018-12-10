import React, { Component } from 'react';
import styled from 'styled-components';

import Text from 'react/components/UI/Text';

const Outer = styled.div`
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  margin-left: 1.25em;
  font-weight: bold;
  display: flex;
  align-items: center;

  // Plus sign
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    background-color: ${props => props.theme.colors.gray.medium};
    width: 10px;
    height: 2px;
    top: 50%;
    left: 0;
    margin-left: -1.25em;
    transform: translateY(-50%);
  }

  &:after {
    transform: translateY(-50%) rotate(90deg);
  }
`;


export default class NewChannelButton extends Component {
  render() {
    return (
      <Outer>
        <Container>
          <Text f={2}>
            New Channel
          </Text>
        </Container>
      </Outer>
    );
  }
}
