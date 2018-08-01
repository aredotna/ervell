import React from "react";
import { VelocityComponent } from "velocity-react";
import styled from "styled-components";

const ANIMATION_PERIOD = 500;

const AnimatedPageWrapper = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  opacity: 0; // Hack to prevent flash before styles/js load for SS rendering.
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;
  width: 100%;
`;

class AnimatedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
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
      setTimeout(callback, ANIMATION_PERIOD)
    });
  }

  render() {
    return (
      <VelocityComponent
        animation={
          { opacity: this.state.show ? 1 : 0 }
        }
        duration={ANIMATION_PERIOD}
      >
        <AnimatedPageWrapper style={{ opacity: 0 }}>
          {this.props.children}
        </AnimatedPageWrapper>
      </VelocityComponent>
    );
  }
};

export default AnimatedPage;
