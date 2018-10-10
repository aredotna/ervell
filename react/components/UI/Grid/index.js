import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import constants from 'react/styles/constants';
import { multiply } from 'react/styles/functions';

const { blockGutter, blockWidth } = constants;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -${blockGutter};
  margin-right: -${blockGutter};

  ${constants.media.mobile`
    margin-left: 0;
    margin-right: 0;
  `}
`;

const GridItem = styled.div`
  position: relative;
  margin: 0 ${blockGutter} ${multiply(blockGutter, 2)} ${blockGutter};
  width: ${blockWidth};

  ${x => !x.variableHeight && `
    height: ${blockWidth};
  `}
`;

export default class Grid extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    variableHeight: PropTypes.bool,
  }

  static defaultProps = {
    variableHeight: false,
  }

  render() {
    const { children, variableHeight, ...rest } = this.props;

    return (
      <Container {...rest}>
        {Children.map(children, child => (child &&
          <GridItem variableHeight>
            {child}
          </GridItem>
        ))}
      </Container>
    );
  }
}
