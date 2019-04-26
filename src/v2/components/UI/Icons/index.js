import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { themeGet } from 'styled-system'

import Box from 'v2/components/UI/Box'

import Lock from 'v2/components/UI/Icons/Lock.svg'
import ArenaMark from 'v2/components/UI/Icons/ArenaMark.svg'
import X from 'v2/components/UI/Icons/X.svg'
import MagnifyingGlass from 'v2/components/UI/Icons/MagnifyingGlass.svg'
import Clipboard from 'v2/components/UI/Icons/Clipboard.svg'
import Exclaim from 'v2/components/UI/Icons/Exclaim.svg'
import Info from 'v2/components/UI/Icons/Info.svg'
import Question from 'v2/components/UI/Icons/Question.svg'
import Cog from 'v2/components/UI/Icons/Cog.svg'
import CreditCard from 'v2/components/UI/Icons/CreditCard.svg'
import Follow from 'v2/components/UI/Icons/Follow.svg'
import Link from 'v2/components/UI/Icons/Link.svg'
import Mute from 'v2/components/UI/Icons/Mute.svg'
import Pencil from 'v2/components/UI/Icons/Pencil.svg'
import SpeechBubble from 'v2/components/UI/Icons/SpeechBubble.svg'
import Unfollow from 'v2/components/UI/Icons/Unfollow.svg'
import Unmute from 'v2/components/UI/Icons/Unmute.svg'
import Group from 'v2/components/UI/Icons/Group.svg'
import Logout from 'v2/components/UI/Icons/Logout.svg'
import Medallion from 'v2/components/UI/Icons/Medallion.svg'
import Tools from 'v2/components/UI/Icons/Tools.svg'
import Cap from 'v2/components/UI/Icons/Cap.svg'
import RightCaret from 'v2/components/UI/Icons/RightCaret.svg'
import EnterFullscreen from 'v2/components/UI/Icons/EnterFullscreen.svg'
import ExitFullscreen from 'v2/components/UI/Icons/ExitFullscreen.svg'

export const COMPONENTS = {
  ArenaMark: <ArenaMark />,
  Lock: <Lock />,
  X: <X />,
  MagnifyingGlass: <MagnifyingGlass />,
  Clipboard: <Clipboard />,
  Exclaim: <Exclaim />,
  Info: <Info />,
  Question: <Question />,
  Cog: <Cog />,
  CreditCard: <CreditCard />,
  Follow: <Follow />,
  Link: <Link />,
  Mute: <Mute />,
  Pencil: <Pencil />,
  SpeechBubble: <SpeechBubble />,
  Unfollow: <Unfollow />,
  Unmute: <Unmute />,
  Group: <Group />,
  Logout: <Logout />,
  Medallion: <Medallion />,
  Tools: <Tools />,
  Cap: <Cap />,
  RightCaret: <RightCaret />,
  EnterFullscreen: <EnterFullscreen />,
  ExitFullscreen: <ExitFullscreen />,
}

export const ICON_NAMES = Object.keys(COMPONENTS)

const DEFAULT_ICON_SIZE = 6 // 1em

const size = key => props =>
  props.theme.space[props[key] || props.size || DEFAULT_ICON_SIZE] ||
  props[key] ||
  props.size

const Container = styled(Box)`
  display: inline-block;
  position: relative;
  width: ${size('width')};
  height: ${size('height')};
  vertical-align: bottom;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill: ${({ color, theme }) =>
      themeGet(`colors.${color}`, 'inherit')({ theme })};
  }
`

export default class Icons extends Component {
  static propTypes = {
    name: PropTypes.oneOf(ICON_NAMES).isRequired,
  }

  render() {
    const { name, ...rest } = this.props

    return <Container {...rest}>{COMPONENTS[name]}</Container>
  }
}
