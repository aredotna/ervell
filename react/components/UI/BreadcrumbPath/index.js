import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from 'react/styles';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 2em 0;
  line-height: 1;
  font-size: ${Styles.Type.size.h3};
`;

const Crumb = styled.div`
  font-weight: bold;
  color: ${Styles.Colors.gray.medium};

  &:after {
    content: '/';
    margin: 0 0.33em;
    font-weight: normal;
  }

  &:last-child {
    color: ${Styles.Colors.gray.semiBold};

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
    const { children } = this.props;

    return (
      <Container>
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
