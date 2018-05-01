import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from 'react/styles';

const Container = styled.div`
  position: relative;
  overflow: hidden;

  ${x => x.mode === 'resting' && `
    max-height: ${x.height};
  `}
`;

const Button = styled.a`
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2rem;
  background: linear-gradient(${Styles.Colors.utility.transparent}, white);

  &:hover {
    opacity: 0.75;
  }
`;

export default class Expandable extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    height: PropTypes.string.isRequired,
  }

  state = {
    mode: 'resting',
  }

  componentDidMount() {
    if (this.contents.clientHeight <= this.container.clientHeight) {
      this.setState({ mode: 'expanded' });
    }
  }

  expandContents = () => {
    this.setState({ mode: 'expanded' });
  }

  render() {
    const { mode } = this.state;
    const {
      children, height, ...rest
    } = this.props;

    return (
      <Container
        height={height}
        mode={mode}
        innerRef={(el) => { this.container = el; }}
        {...rest}
      >
        <div ref={(el) => { this.contents = el; }}>
          {children}
        </div>

        {mode === 'resting' &&
          <Button onClick={this.expandContents} />
        }
      </Container>
    );
  }
}
