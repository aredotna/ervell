import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';

import constants from 'react/styles/constants';
import { multiply } from 'react/styles/functions';

const { blockGutter, blockWidth } = constants;

const containerMixin = css`
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

const Container = styled.div`
  ${containerMixin}
`;

const InfiniteContainer = styled(InfiniteScroll)`
  ${containerMixin}
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
    loadMore: PropTypes.func,
  }

  static defaultProps = {
    variableHeight: false,
    loadMore: null,
  }

  render() {
    const {
      children, variableHeight, loadMore, ...rest
    } = this.props;

    const Tag = loadMore ? InfiniteContainer : Container;

    return (
      <Tag loadMore={loadMore} {...rest}>
        {Children.map(children, child => (child &&
          <GridItem variableHeight>
            {child}
          </GridItem>
        ))}
      </Tag>
    );
  }
}
