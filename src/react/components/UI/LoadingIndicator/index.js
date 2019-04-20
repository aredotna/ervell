import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

const Container = styled(Box).attrs({
  width: '100%',
  height: '100%',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})`
  user-select: none;
`;

export default class LoadingIndicator extends Component {
  static propTypes = {
    frames: PropTypes.arrayOf(PropTypes.string),
    interval: PropTypes.number,
    f: PropTypes.number,
    color: PropTypes.string,
  }

  static defaultProps = {
    frames: [
      '···',
      '·',
      '··',
    ],
    interval: 175,
    f: 7,
    color: 'gray.base',
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
    const {
      frames, f, color, ...rest
    } = this.props;

    return (
      <Container {...rest}>
        <Text f={f} color={color}>
          {frames[cursor % frames.length]}
        </Text>
      </Container>
    );
  }
}
