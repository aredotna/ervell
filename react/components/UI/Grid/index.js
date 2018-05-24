import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styles from 'react/styles';

const { blockGutter, blockWidth } = styles.Constants;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // TODO: Once old blocks are migrated, we can remove negative
  // margins and use "justify-content: space-between;"
  margin-left: -${blockGutter};
  margin-right: -${blockGutter};

  ${styles.Constants.media.mobile`
    margin-left: 0;
    margin-right: 0;
  `}
`;

const GridItem = styled.div`
  position: relative;
  margin: 0 ${blockGutter} ${styles.Functions.multiply(blockGutter, 2)} ${blockGutter};
  width: ${blockWidth};

  ${x => !x.variableHeight && `
    height: ${blockWidth};
  `}
`;

const GridItemFiller = GridItem.extend`
  height: 0;
  opacity: 0;
  margin-top: 0;
  margin-bottom: 0;
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

        {/* HACK: Forces left-alignment */}
        <GridItemFiller />
        <GridItemFiller />
        <GridItemFiller />
        <GridItemFiller />
        <GridItemFiller />
        <GridItemFiller />
        <GridItemFiller />
        <GridItemFiller />
        <GridItemFiller />
      </Container>
    );
  }
}
