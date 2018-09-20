import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, textColor, borderColor, fontFamily, fontSize } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased } from 'react/styles/mixins';

import Icons, { ICON_NAMES } from 'react/components/UI/Icons';

const Outline = styled.div`
  box-sizing: border-box;
  display: inline-block;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid;
  border-radius: 0.33em;
  line-height: 1;
  user-select: none;
  cursor: default;
  ${preset(space, { py: 2, px: 3 })}
  ${preset(fontFamily, { font: 'narrow' })}
  ${preset(fontSize, { f: 1 })}
  ${preset(textColor, { color: 'gray.base' })}
  ${preset(borderColor, { borderColor: 'inherit' })}
  ${antialiased}
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
`;

export default class Badge extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
    icon: PropTypes.oneOf(ICON_NAMES),
  }

  static defaultProps = {
    icon: null,
    color: 'gray.base',
  }

  render() {
    const {
      children, icon, color, ...rest
    } = this.props;

    return (
      <Outline color={color} {...rest}>
        <Inner>
          {icon &&
            <Icons mr={2} name={icon} size={5} color={color} />
          }

          <span>{children}</span>
        </Inner>
      </Outline>
    );
  }
}
