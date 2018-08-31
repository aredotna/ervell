import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  height: 3rem;
  background: linear-gradient(${x => x.theme.colors.utility.transparent} 0%, white 75%);
  opacity: 0;

  &[data-enabled="true"] {
    opacity: 1;
  }

  &:hover {
    background: linear-gradient(${x => x.theme.colors.utility.transparent} 25%, white 90%);
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
    if (prevState.mode !== nextProps.mode && nextProps.mode !== 'resting') {
      return { mode: nextProps.mode };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      mode: props.mode,
      force: false,
      isEnabled: false,
    };
  }

  componentDidMount() {
    if (!this.isOverFlowing()) {
      this.setState({ mode: 'expanded', force: true });
    }

    this.setState({
      isEnabled: typeof window !== 'undefined',
    });
  }

  isOverFlowing() {
    return this.contents.clientHeight > this.container.clientHeight;
  }

  expandContents = () => {
    this.setState({ mode: 'expanded' });
    this.props.onExpand();
  }

  render() {
    const { mode, force, isEnabled } = this.state;
    const {
      children, height, mode: _initialMode, ...rest
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
          <Button data-enabled={isEnabled} onClick={this.expandContents} />
        }
      </Container>
    );
  }
}
