import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, width, height } from 'styled-system';

import { preset } from 'react/styles/functions';

import Text from 'react/components/UI/Text';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  user-select: none;

  ${space}
  ${preset(width, { width: '100%' })}
  ${preset(height, { height: '100%' })}
`;

export default class LoadingIndicator extends Component {
  static propTypes = {
    frames: PropTypes.arrayOf(PropTypes.string),
    interval: PropTypes.number,
  }

  static defaultProps = {
    frames: [
      '·',
      '··',
      '···',
    ],
    interval: 175,
  }

  state = {
    cursor: 0,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ cursor }) => ({ cursor: cursor + 1 }));
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { cursor } = this.state;
    const { frames, ...rest } = this.props;

    return (
      <Container {...rest}>
        <Text f={7} color="gray.base">
          {frames[cursor % frames.length]}
        </Text>
      </Container>
    );
  }
}
