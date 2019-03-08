import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

import Box from 'react/components/UI/Box';

import Lock from 'react/components/UI/Icons/Lock.svg';
import ArenaMark from 'react/components/UI/Icons/ArenaMark.svg';
import X from 'react/components/UI/Icons/X.svg';
import MagnifyingGlass from 'react/components/UI/Icons/MagnifyingGlass.svg';
import Clipboard from 'react/components/UI/Icons/Clipboard.svg';
import Exclaim from 'react/components/UI/Icons/Exclaim.svg';
import Info from 'react/components/UI/Icons/Info.svg';
import Question from 'react/components/UI/Icons/Question.svg';
import Cog from 'react/components/UI/Icons/Cog.svg';
import CreditCard from 'react/components/UI/Icons/CreditCard.svg';
import Follow from 'react/components/UI/Icons/Follow.svg';
import Link from 'react/components/UI/Icons/Link.svg';
import Mute from 'react/components/UI/Icons/Mute.svg';
import Pencil from 'react/components/UI/Icons/Pencil.svg';
import SpeechBubble from 'react/components/UI/Icons/SpeechBubble.svg';
import Unfollow from 'react/components/UI/Icons/Unfollow.svg';
import Unmute from 'react/components/UI/Icons/Unmute.svg';

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
};

export const ICON_NAMES = Object.keys(COMPONENTS);

const DEFAULT_ICON_SIZE = 6; // 1em

const size = key => props => (
  props.theme.space[props[key] || props.size || DEFAULT_ICON_SIZE] ||
  props[key] ||
  props.size
);

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
    fill: ${({ color, theme }) => themeGet(`colors.${color}`, 'inherit')({ theme })};
  }
`;

export default class Icons extends Component {
  static propTypes = {
    name: PropTypes.oneOf(ICON_NAMES).isRequired,
  }

  render() {
    const { name, ...rest } = this.props;

    return (
      <Container {...rest}>
        {COMPONENTS[name]}
      </Container>
    );
  }
}
