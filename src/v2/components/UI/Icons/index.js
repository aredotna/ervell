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
import QuestionCircle from 'v2/components/UI/Icons/QuestionCirc.svg'
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
import Ellipsis from 'v2/components/UI/Icons/Ellipsis.svg'
import Garbage from 'v2/components/UI/Icons/Garbage.svg'
import Globe from 'v2/components/UI/Icons/Globe.svg'
import UpArrow from 'v2/components/UI/Icons/UpArrow.svg'
import DownArrow from 'v2/components/UI/Icons/DownArrow.svg'
import ArrowNext from 'v2/components/UI/Icons/ArrowNext.svg'
import ArrowPrev from 'v2/components/UI/Icons/ArrowPrev.svg'
import Drag from 'v2/components/UI/Icons/Drag.svg'
import Apple from 'v2/components/UI/Icons/Apple.svg'
import Android from 'v2/components/UI/Icons/Android.svg'
import Hamburger from 'v2/components/UI/Icons/Hamburger.svg'
import Minimize from 'v2/components/UI/Icons/Minimize.svg'
import Filters from 'v2/components/UI/Icons/Filters.svg'
import Profile from 'v2/components/UI/Icons/Profile.svg'
import Channel from 'v2/components/UI/Icons/Channel.svg'
import CircleFilled from 'v2/components/UI/Icons/CircleFilled.svg'
import CircleOutline from 'v2/components/UI/Icons/CircleOutline.svg'
import CloseEx from 'v2/components/UI/Icons/CloseIcon.svg'

export const COMPONENTS = {
  ArenaMark: <ArenaMark />,
  Lock: <Lock />,
  X: <X />,
  MagnifyingGlass: <MagnifyingGlass />,
  Clipboard: <Clipboard />,
  Exclaim: <Exclaim />,
  Info: <Info />,
  Question: <Question />,
  QuestionCircle: <QuestionCircle />,
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
  Ellipsis: <Ellipsis />,
  Garbage: <Garbage />,
  Globe: <Globe />,
  UpArrow: <UpArrow />,
  DownArrow: <DownArrow />,
  ArrowNext: <ArrowNext />,
  ArrowPrev: <ArrowPrev />,
  Drag: <Drag />,
  Apple: <Apple />,
  Android: <Android />,
  Hamburger: <Hamburger />,
  Minimize: <Minimize />,
  Filters: <Filters />,
  Profile: <Profile />,
  Channel: <Channel />,
  CircleFilled: <CircleFilled />,
  CircleOutline: <CircleOutline />,
  Close: <CloseEx />,
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
