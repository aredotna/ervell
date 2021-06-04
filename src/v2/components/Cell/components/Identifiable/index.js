import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import { Link } from 'react-router-dom'

import constants from 'v2/styles/constants'

import identifiableCellFragment from 'v2/components/Cell/components/Identifiable/fragments/identifiableCell'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Badge from 'v2/components/UI/Badge'
import Truncate from 'v2/components/UI/Truncate'
import MemberAvatar from 'v2/components/MemberAvatar'
import { mixin as dividerButtonMixin } from 'v2/components/UI/Buttons/components/DividerButton'
import FollowButton from 'v2/components/FollowButton'

import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'

const IdentifiableFollowButton = styled(FollowButton)`
  ${dividerButtonMixin}
`

const Wrap = styled(Box).attrs({})`
  display: flex;
  flex: 0.33;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
`

const Container = styled(Link).attrs({
  px: 4,
  mb: 8,
})`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  width: ${props => props.theme.constantValues.blockWidth};
  height: ${props => props.theme.constantValues.blockWidth};
  border: 2px solid ${props => props.theme.colors.gray.regular};
  border-radius: ${constants.radii.subtle};
  ${space}

  &:hover {
    border-color: ${props => props.theme.colors.gray.bold};
  }

  ${x =>
    x.__typename === 'Group' &&
    `
    background-color: ${x.theme.colors.gray.hint};
  `}
`

export default class Indentifiable extends PureComponent {
  static propTypes = {
    identifiable: propType(identifiableCellFragment).isRequired,
  }

  state = {
    mode: 'resting',
  }

  onMouseEnter = () => {
    this.setState({ mode: 'hover' })
  }

  onMouseLeave = () => {
    this.setState({ mode: 'resting' })
  }

  render() {
    const { mode } = this.state
    const { identifiable } = this.props

    return (
      <Container
        to={{
          pathname: identifiable.href,
          state: getBreadcrumbPath(identifiable),
        }}
        role="button"
        tabIndex={0}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        mode={mode}
        __typename={identifiable.__typename}
      >
        <Wrap>
          <Text f={5} fontWeight="bold" textAlign="center" breakWord>
            <Truncate length={20}>{identifiable.name}</Truncate>

            {identifiable.__typename === 'Group' && (
              <Badge
                f={0}
                ml={4}
                icon={{ private: 'Lock' }[identifiable.visibility]}
              >
                Group
              </Badge>
            )}
          </Text>
        </Wrap>

        <MemberAvatar
          size={140}
          member={identifiable}
          circle={identifiable.__typename === 'Group'}
          isLinked={false}
        />

        <Wrap>
          {mode !== 'resting' && (
            <IdentifiableFollowButton
              f={4}
              id={identifiable.id}
              type={identifiable.__typename.toUpperCase()}
            />
          )}
        </Wrap>
      </Container>
    )
  }
}
