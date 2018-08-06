import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ANIMATION_PERIOD = 250;

// Note:
// We need positionAbsoluteDuringTransition because the texts
// passed here may be different lengths and wrap depending on
// the size of their container. In order that our texts can
// smoothly transition on the same line, we need the shorter
// text to position itself on top of the other during transitions
// so that the longer text may wrap without overlapping other
// elements on the page.
const AnimatedPageWrapper = styled.div`
  opacity: ${({ opacity }) => opacity};
  transition: opacity ${ ANIMATION_PERIOD }ms ease-in-out;

  ${({positionAbsoluteDuringTransition}) =>
    positionAbsoluteDuringTransition &&
    `
    &:not(:only-child) {
      position: absolute!important;
      left: 0;
      right: 0;
      top: 0;
    }
  `};
`;

class AnimatedCTAText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  componentWillAppear(callback) {
    this.animateIn(callback);
  }

  componentWillEnter(callback) {
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
      <AnimatedPageWrapper
        opacity={this.state.show ? 1 : 0}
        positionAbsoluteDuringTransition={this.props.positionAbsoluteDuringTransition}
      >
        {this.props.children}
      </AnimatedPageWrapper>
    );
  }
};

AnimatedCTAText.propTypes = {
  positionAbsoluteDuringTransition: PropTypes.bool.isRequired
};

AnimatedCTAText.defaultProps = {
  positionAbsoluteDuringTransition: false
};

export default AnimatedCTAText;
