import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import styled from 'styled-components';

import styles from 'react/styles';

import is from 'react/util/is';

import BreadcrumbPath from 'react/components/UI/BreadcrumbPath';

const Container = styled.div`
  display: flex;
`;

const StuckBreadcrumbPath = styled(BreadcrumbPath)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${styles.Constants.headerHeight};
  z-index: ${styles.Constants.z.header};
  pointer-events: none;

  > div {
    pointer-events: auto;
    height: 100%;
    font-size: ${styles.Type.size.base};
  }

  ${styles.Constants.media.mobile`
    display: none;
  `}
`;

export default class StickyBreadcrumbPath extends Component {
  static Crumb = BreadcrumbPath.Crumb

  static propTypes = {
    children: PropTypes.node.isRequired,
    stuckChildren: PropTypes.node,
  }

  static defaultProps = {
    stuckChildren: null,
  }

  state = {
    mode: 'resting',
  }

  componentDidMount() {
    if (!is.elVisible(this.targetEl)) {
      this.handleLeave();
    }
  }

  handleEnter = () => {
    this.setState({ mode: 'resting' });
  }

  handleLeave = () => {
    this.setState({ mode: 'stuck' });
  }

  render() {
    const { mode } = this.state;
    const { children, stuckChildren } = this.props;

    return (
      <Container>
        <Waypoint
          onEnter={this.handleEnter}
          onLeave={this.handleLeave}
        >
          <BreadcrumbPath>
            <div ref={(el) => { this.targetEl = el; }} />

            {children}
          </BreadcrumbPath>
        </Waypoint>

        {mode === 'stuck' &&
          <StuckBreadcrumbPath>
            {stuckChildren || children}
          </StuckBreadcrumbPath>
        }
      </Container>
    );
  }
}
