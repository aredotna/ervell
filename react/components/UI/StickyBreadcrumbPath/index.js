import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import styled from 'styled-components';

import styles from 'react/styles';

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
  font-size: ${styles.Type.size.sm};
  z-index: 9999999; // TODO
`;

export default class StickyBreadcrumbPath extends Component {
  static Crumb = BreadcrumbPath.Crumb

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    mode: 'resting',
  }

  handleEnter = () =>
    this.setState({ mode: 'resting' });

  handleLeave = () =>
    this.setState({ mode: 'stuck' });

  render() {
    const { mode } = this.state;
    const { children } = this.props;

    return (
      <Container>
        <Waypoint
          onEnter={this.handleEnter}
          onLeave={this.handleLeave}
        >
          <BreadcrumbPath>
            {children}
          </BreadcrumbPath>
        </Waypoint>

        {mode === 'stuck' &&
          <StuckBreadcrumbPath>
            {children}
          </StuckBreadcrumbPath>
        }
      </Container>
    );
  }
}
