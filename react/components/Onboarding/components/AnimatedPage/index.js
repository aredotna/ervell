import React from 'react';
import styled from 'styled-components';

const ANIMATION_PERIOD = 500;

const AnimatedPageWrapper = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  opacity: ${({ opacity }) => opacity};
  padding: 2em;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;
  transition: opacity ${ANIMATION_PERIOD}ms ease-in-out;
  width: 100%;
`;

class AnimatedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  componentWillAppear(callback) {
    // Called on fresh load.
    this.animateIn(callback);
  }

  componentWillEnter(callback) {
    // Called during transition between routes.
    this.animateIn(callback);
  }

  componentWillLeave(callback) {
    this.animateOut(callback);
  }

  animateIn(callback) {
    setTimeout(() => {
      this.setState({ show: true }, callback);
    }, ANIMATION_PERIOD);
  }

  animateOut(callback) {
    this.setState({ show: false }, () => {
      setTimeout(callback, ANIMATION_PERIOD);
    });
  }

  render() {
    return (
      <AnimatedPageWrapper
        opacity={this.state.show ? 1 : 0}
      >
        {this.props.children}
      </AnimatedPageWrapper>
    );
  }
}

export default AnimatedPage;
