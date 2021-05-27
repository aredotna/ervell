import React, { Component } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled, { css } from 'styled-components'

import UserAvatar from 'v2/components/UserAvatar'
import Text from 'v2/components/UI/Text'
import FollowButton from 'v2/components/FollowButton'

import contactAvatarFragment from 'v2/components/ConnectTwitter/components/Contact/fragments/contact'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 3px 0;
  border-bottom: 1px solid ${x => x.theme.colors.gray.light};
  flex-shrink: 0;
`

const Identifier = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const Username = styled(Text)`
  display: flex;
  align-self: center;
`

const followMixin = css`
  font-family: ${x => x.theme.fonts.sans};
  justify-self: flex-end;
  font-weight: bold;
  color: ${x => x.theme.colors.gray.medium};
  cursor: pointer;

  &:hover {
    color: ${x => x.theme.colors.gray.bold};
  }
`

const FollowText = styled.span`
  ${followMixin}
  color: ${x => x.theme.colors.gray.semiBold};
  &:after {
    content: 'Follow';
  }
`

const UnfollowText = styled.span`
  ${followMixin}
  &:after {
    content: 'Unfollow';
  }
`

export default class Contact extends Component {
  static propTypes = {
    user: propType(contactAvatarFragment).isRequired,
  }

  render() {
    const { user } = this.props

    return (
      <Container>
        <Identifier>
          <UserAvatar user={user} mr={5} />
          <Username>{user.name}</Username>
        </Identifier>

        <FollowButton id={user.id} type="USER">
          {({ isFollowed }) =>
            ({
              true: <UnfollowText />,
              false: <FollowText />,
            }[isFollowed])
          }
        </FollowButton>
      </Container>
    )
  }
}
