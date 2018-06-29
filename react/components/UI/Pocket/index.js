import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 1em;
`;

const Title = styled.h4`
  margin: 0 0 0.5em 0;
  padding: 0 0 0.5em 0;
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  line-height: ${x => x.theme.lineHeightsIndexed.tall};
  color: ${x => x.theme.colors.gray.medium};
  border-bottom: 1px solid ${x => x.theme.colors.gray.light};
  font-weight: normal;
`;

const Content = styled.div`
  margin: 0.5em 0;
  color: ${x => x.theme.colors.gray.semiBold};
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  line-height: ${x => x.theme.lineHeightsIndexed.tall};

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
