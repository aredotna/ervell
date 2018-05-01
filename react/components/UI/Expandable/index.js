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
    onExpand: PropTypes.func,
    mode: PropTypes.string,
  }

  static defaultProps = {
    onExpand: () => {},
    mode: 'resting',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.mode !== nextProps.mode) {
      return { mode: nextProps.mode };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      mode: props.mode,
      force: false,
    };
  }

  componentDidMount() {
    if (!this.isOverFlowing()) {
      this.setState({ mode: 'expanded', force: true });
    }
  }

  isOverFlowing() {
    return this.contents.clientHeight > this.container.clientHeight;
  }

  expandContents = () => {
    this.setState({ mode: 'expanded' });
    this.props.onExpand();
  }

  render() {
    const { mode, force } = this.state;
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

        {mode === 'resting' && !force &&
          <Button onClick={this.expandContents} />
        }
      </Container>
    );
  }
}
