import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { baseMixin } from 'react/components/UI/Text';
import { space } from 'styled-system';

import { preset } from 'react/styles/functions';

export const activeMixin = css`
  border-top: 2px solid ${x => x.theme.colors.gray.bold};
  border-left: 1px solid ${x => x.theme.colors.gray.regular};
  border-right: 1px solid ${x => x.theme.colors.gray.regular};
  border-bottom: 1px solid ${x => x.theme.colors.gray.light};
  color: ${x => x.theme.colors.gray.bold};
  background-color: ${x => x.theme.colors.gray.light};
`;

const Label = styled.div.attrs({ fontSize: 3 })`
  text-align: center;
  border: 1px solid transparent;
  border-top: 2px solid transparent;
  cursor: pointer;
  margin-bottom: -1px;
  font-weight: bold;

  ${preset(space, { pt: 5, pb: 6, px: 9 })};
  ${baseMixin};

  ${x => x.active && activeMixin};
`;

export default class TabList extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onTabClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
  }

  static defaultProps = {
    active: false,
  }

  onTabClick = () => {
    const { onTabClick, label } = this.props;
    onTabClick(label);
  }

  render() {
    const { label, active } = this.props;

    return (
      <Label active={active} onClick={this.onTabClick}>
        {label}
      </Label>
    );
  }
}
