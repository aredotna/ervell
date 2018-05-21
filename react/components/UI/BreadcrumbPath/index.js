import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styles from 'react/styles';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 2em 0;
  font-size: ${styles.Type.size.h3};
  line-height: ${styles.Type.lineHeight.base};

  ${styles.Constants.media.mobile`
    font-size: ${styles.Type.size.h4};
    margin: 0 0 1em 0;
    margin-right: ${styles.Constants.blockGutter}; // TODO: Remove
    margin-left: ${styles.Constants.blockGutter}; // TODO: Remove
  `}
`;

const Crumb = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${styles.Colors.gray.medium};

  &:after {
    content: '/';
    margin: 0 0.33em;
    font-weight: normal;
  }

  &:last-child {
    color: ${styles.Colors.gray.semiBold};

    // Hides trailing slash
    &:after {
      display: none;
    }
  }
`;

export default class BreadcrumbPath extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  static Crumb = Crumb;

  render() {
    const { children, ...rest } = this.props;

    return (
      <Container {...rest}>
        <Crumb>
          <a href="/">
            Are.na
          </a>
        </Crumb>

        {children}
      </Container>
    );
  }
}
