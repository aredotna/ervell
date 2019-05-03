import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components'

import primarySearchResultFragment from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/PrimarySearchResult/fragments/primarySearchResult'

import Text from 'v2/components/UI/Text'
import GroupBadge from 'v2/components/UI/GroupBadge'
import { ICON_OFFSET } from 'v2/components/UI/SearchInput'
import BorderedLock from 'v2/components/UI/BorderedLock'

import { overflowEllipsis } from 'v2/styles/mixins'
import { mixin as boxMixin } from 'v2/components/UI/Box'

const Label = styled(Text)`
  font-weight: bold;
  // Push out to accomodate "overflowing" badge border
  padding-right: 1px;
  ${overflowEllipsis}
`

const Container = styled.a`
  ${boxMixin}
  display: flex;
  text-decoration: none;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: ${props => props.theme.colors.gray.hint};
  }

  ${props =>
    props.selected &&
    `
    background-color: ${props.theme.colors.state.neutral};
  `}
`

const PathContainer = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    &:after {
      content: '/';
      margin: 0 ${props => props.theme.constantValues.emptySpaceWidth};
      font-family: ${props => props.theme.fonts.mono};
      opacity: 0.5;
    }

    &:last-child:after {
      content: '';
      margin: 0;
    }
  }
`

Container.defaultProps = {
  pl: ICON_OFFSET,
  pr: 6,
  py: 6,
  bg: 'gray.light',
  borderTop: '1px solid',
  borderColor: 'gray.semiLight',
}

export default class PrimarySearchResult extends PureComponent {
  static propTypes = {
    result: propType(primarySearchResultFragment),
    children: PropTypes.node,
    selected: PropTypes.bool,
  }

  static defaultProps = {
    result: null,
    children: null,
    selected: false,
  }

  preventBlur = e => {
    e.preventDefault()
  }

  render() {
    const { result, children, ...rest } = this.props

    if (result) {
      return (
        <Container href={result.href} onMouseDown={this.preventBlur} {...rest}>
          <PathContainer>
            {result.owner && (
              <Label flex="1">
                {result.owner.name}

                {result.owner.__typename === 'Group' && (
                  <GroupBadge f={0} visibility={result.owner.visibility} />
                )}
              </Label>
            )}

            <Label
              color={
                result.visibility ? `channel.${result.visibility}` : 'gray.base'
              }
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: result.label,
                }}
              />

              {result.visibility === 'private' && <BorderedLock ml={3} />}

              {result.__typename === 'Group' && (
                <GroupBadge f={0} visibility={result.visibility} />
              )}
            </Label>
          </PathContainer>
        </Container>
      )
    }

    return (
      <Container onMouseDown={this.preventBlur} {...rest}>
        {children}
      </Container>
    )
  }
}
