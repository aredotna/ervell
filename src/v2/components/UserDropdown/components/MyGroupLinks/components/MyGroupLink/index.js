import React, { Component } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'

import myGroupLinkFragment from 'v2/components/UserDropdown/components/MyGroupLinks/components/MyGroupLink/fragments/myGroupLink'

import Box, { mixin as boxMixin } from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import MemberAvatar from 'v2/components/MemberAvatar'
import BorderedLock from 'v2/components/UI/BorderedLock'
import { Link } from 'react-router-dom'

const Container = styled(Link)`
  ${boxMixin}
  text-decoration: none;
`

const Avatar = styled(MemberAvatar)`
  opacity: 0.65;
  ${x => x.mode === 'hover' && 'opacity: 0.7;'};
`

const GroupName = styled(Text)`
  ${x =>
    x.mode === 'hover' &&
    `
    color: ${x.theme.colors.bold};
  `}
`

export default class MyGroupLink extends Component {
  static propTypes = {
    group: propType(myGroupLinkFragment).isRequired,
  }

  state = {
    mode: 'resting',
  }

  onMouseOver = () => {
    this.setState({ mode: 'hover' })
  }

  onMouseOut = () => {
    this.setState({ mode: 'resting' })
  }

  render() {
    const { group } = this.props
    const { mode } = this.state

    return (
      <Container
        to={group.href}
        py="0.5rem"
        px="1rem"
        display="flex"
        alignItems="center"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onFocus={this.onMouseOver}
        onBlur={this.onMouseOut}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            member={group}
            size={20}
            isLinked={false}
            circle
            mode={mode}
          />
        </Box>

        <GroupName mode={mode} f={2} pl={5} fontWeight="bold">
          {group.name}
        </GroupName>

        {group.visibility === 'private' && <BorderedLock ml={3} />}
      </Container>
    )
  }
}
