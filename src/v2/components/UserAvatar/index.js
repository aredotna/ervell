import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'
import { textColor, fontFamily } from 'styled-system'

import Avatar from 'v2/components/UI/Avatar'

import { preset } from 'v2/styles/functions'
import { antialiased } from 'v2/styles/mixins'

import userAvatarFragment from 'v2/components/UserAvatar/fragments/userAvatar'

const Initials = styled.div`
  font-size: ${x => x.size / 3}px;
  color: ${x => x.theme.colors.gray.medium};
  text-transform: uppercase;
  ${preset(fontFamily, { font: 'sans' })}
  ${preset(textColor, { color: 'gray.base' })}
  ${antialiased}
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

export default class UserAvatar extends Component {
  static defaultProps = {
    size: 40,
  }

  static propTypes = {
    user: propType(userAvatarFragment).isRequired,
    size: PropTypes.number,
  }

  state = {
    hideImage: false,
  }

  hideImage = () => {
    this.setState({ hideImage: true })
  }

  render() {
    const { hideImage } = this.state
    const { user, size, ...rest } = this.props

    return (
      <Avatar href={user.href} f={size} size={size} {...rest}>
        <Initials f={size}>{user.initials}</Initials>

        {user.avatar && !hideImage && (
          <Image
            src={user.avatar}
            alt={user.initials}
            onError={this.hideImage}
          />
        )}
      </Avatar>
    )
  }
}
