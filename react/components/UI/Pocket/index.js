import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from 'react/styles';

const Container = styled.div`
  margin-bottom: 1em;
`;

const Title = styled.h4`
  margin: 0 0 0.5em 0;
  padding: 0 0 0.5em 0;
  font-size: ${Styles.Type.size.sx};
  line-height: ${Styles.Type.lineHeight.tall};
  color: ${Styles.Colors.gray.medium};
  border-bottom: 1px solid ${Styles.Colors.gray.light};
  font-weight: normal;
`;

const Content = styled.div`
  margin: 0.5em 0;
  color: ${Styles.Colors.gray.semiBold};
  font-size: ${Styles.Type.size.sx};
  line-height: ${Styles.Type.lineHeight.tall};

  p {
    margin: 0.5em auto;
    padding-right: 1em;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    font-weight: bold;
  }
`;

export default class Pocket extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const { title, children } = this.props;

    return (
      <Container>
        <Title>
          {title}
        </Title>

        <Content>
          {children}
        </Content>
      </Container>
    );
  }
}
