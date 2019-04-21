import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

import Box from 'v2/components/UI/Box';

const Switch = styled(Box)`
  position: relative;
  width: ${props => props.size};
  height: ${props => props.size};
  cursor: pointer;

  &:before,
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &:before {
    height: 20%;
    width: 100%;
    right: 0;
    left: 0;
    background-color: ${props => props.theme.colors.gray.regular};
    border-radius: 0.25em;
  }

  &:after {
    height: 50%;
    width: 50%;
    border-radius: 50%;
    left: 0;
    background-color: ${props =>
      themeGet(`colors.${props.inactiveColor}`)(props)};
  }

  ${props =>
    props.value &&
    `
    &:after {
      left: unset;
      margin-left: unset;
      right: 0;
      background-color: ${themeGet(`colors.${props.activeColor}`)(props)};
    }
  `}

  ${props =>
    props.disabled &&
    `
    opacity: 0.5;
    pointer-events: none;
    cursor: default;
  `}
`;

export default class ToggleSwitch extends PureComponent {
  static propTypes = {
    size: PropTypes.string,
    value: PropTypes.bool,
    inactiveColor: PropTypes.string,
    activeColor: PropTypes.string,
    onToggle: PropTypes.func,
  };

  static defaultProps = {
    size: '2em',
    value: false,
    inactiveColor: 'gray.medium',
    activeColor: 'gray.bold',
    onToggle: () => {},
  };

  state = {
    value: this.props.value,
  };

  toggle = e => {
    e.preventDefault();

    const { value: prevValue } = this.state;
    const { onToggle } = this.props;

    const value = !prevValue;

    this.setState({ value }, () => onToggle(value));
  };

  render() {
    const { value: _value, ...rest } = this.props;
    const { value } = this.state;

    return (
      <Switch
        onClick={this.toggle}
        role="button"
        tabIndex={0}
        value={value}
        {...rest}
      />
    );
  }
}
