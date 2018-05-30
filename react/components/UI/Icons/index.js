import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 1em;
  height: 1em;
  vertical-align: text-top;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill: ${x => x.color || 'inherit'};
  }
`;

export default class Icon extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children, ...rest } = this.props;

    return (
      <Container {...rest}>
        {children}
      </Container>
    );
  }
}
