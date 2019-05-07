import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'

import constants from 'v2/styles/constants'

import Box from 'v2/components/UI/Box'
import GridItem from 'v2/components/UI/Grid/components/GridItem'

const { blockGutter } = constants

const containerMixin = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  ${constants.media.mobile`
    margin-left: 0;
    margin-right: 0;
  `}
`

const Container = styled(Box)`
  ${containerMixin}
`

const InfiniteContainer = styled(InfiniteScroll)`
  ${containerMixin}
`

export default class Grid extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    variableHeight: PropTypes.bool,
    gutterSpacing: PropTypes.number,
    loadMore: PropTypes.func,
    wrapChildren: PropTypes.bool,
  }

  static defaultProps = {
    variableHeight: false,
    gutterSpacing: 4,
    loadMore: null,
    wrapChildren: true,
  }

  render() {
    const {
      children,
      variableHeight,
      loadMore,
      gutterSpacing,
      wrapChildren,
      ...rest
    } = this.props

    const Tag = loadMore ? InfiniteContainer : Container

    return (
      <Tag
        loadMore={loadMore}
        mr={`-${blockGutter}`}
        ml={`-${blockGutter}`}
        {...rest}
      >
        {wrapChildren
          ? Children.map(
              children,
              child =>
                child && (
                  <GridItem gutterSpacing={gutterSpacing}>{child}</GridItem>
                )
            )
          : children}
      </Tag>
    )
  }
}
