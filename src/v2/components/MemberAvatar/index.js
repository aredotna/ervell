import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'

import Avatar from 'v2/components/UI/Avatar'

import memberAvatarFragment from 'v2/components/MemberAvatar/fragments/memberAvatar'

const Initials = styled.div`
  font-family: ${x => x.theme.fonts.sans};
  font-size: ${x => x.size / 3}px !important;
  color: ${x => x.theme.colors.gray.medium};
  text-transform: uppercase;
  text-decoration: none;
`

const Image = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export default class MemberAvatar extends Component {
  static propTypes = {
    member: propType(memberAvatarFragment).isRequired,
    size: PropTypes.number,
    isLinked: PropTypes.bool,
  }

  static defaultProps = {
    size: 40,
    isLinked: true,
  }

  state = {
    hideImage: false,
  }

  hideImage = () => {
    this.setState({ hideImage: true })
  }

  render() {
    const { hideImage } = this.state
    const { member, size, isLinked, ...rest } = this.props

    return (
      <Avatar
        tag={isLinked ? 'a' : 'span'}
        href={member.href}
        size={size}
        {...rest}
      >
        <Initials size={size}>{member.initials}</Initials>

        {member.avatar && !hideImage && (
          <Image
            src={member.avatar}
            alt={member.initials}
            onError={this.hideImage}
          />
        )}
      </Avatar>
    )
  }
}
