import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';

import Text from 'react/components/UI/Text';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  ${space}
`;

export default class LoadingIndicator extends Component {
  static propTypes = {
    frames: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    frames: [
      '·',
      '··',
      '···',
    ],
  }

  state = {
    cursor: 0,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ cursor }) => ({ cursor: cursor + 1 }));
    }, 200);
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
