import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'v2/components/UI/Box';
import Text from 'v2/components/UI/Text';

const Title = styled(Text).attrs({
  mb: '0.5em',
  pb: '0.5em',
  f: 2,
  lineHeight: 2,
  color: 'gray.medium',
})`
  border-bottom: 1px solid ${props => props.theme.colors.gray.light};
`;

const Content = styled(Text).attrs({
  my: '0.5em',
  color: 'gray.semiBold',
  f: 2,
  lineHeight: 2,
})`
  p {
    margin: ${props => props.theme.space[3]} auto;
    padding-right: ${props => props.theme.space[6]};

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    font-weight: bold;

    &:hover {
      color: black;
    }
  }
`;

export default class Pocket extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { title, children } = this.props;

    return (
      <Box mb={6}>
        <Title>{title}</Title>

        <Content>{children}</Content>
      </Box>
    );
  }
}
