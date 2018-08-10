import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeGet, space } from 'styled-system';

import Lock from 'react/components/UI/Icons/Lock.svg';
import ArenaMark from 'react/components/UI/Icons/ArenaMark.svg';
import X from 'react/components/UI/Icons/X.svg';
import MagnifyingGlass from 'react/components/UI/Icons/MagnifyingGlass.svg';

export const COMPONENTS = {
  ArenaMark: <ArenaMark />,
  Lock: <Lock />,
  X: <X />,
  MagnifyingGlass: <MagnifyingGlass />,
};

export const ICON_NAMES = Object.keys(COMPONENTS);

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: ${x => x.theme.space[x.size || 6]};
  height: ${x => x.theme.space[x.size || 6]};
  vertical-align: bottom;
  ${space}

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
