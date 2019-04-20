import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { divide } from 'v2/styles/functions';

import provideChildrenWithProps from 'v2/util/provideChildrenWithProps';

import Box from 'v2/components/UI/Box';

const Container = styled(Box).attrs({
  p: 4,
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  user-select: none;

  ${props =>
    props.selected &&
    `
    background-color: ${props.theme.colors.state.editable};
  `}

  ${props =>
    props.disabled &&
    `
    pointer-events: none;
    opacity: 0.5;
  `}
`;

const Radio = styled(Box).attrs({
  mr: 6,
})`
  border: ${props => divide(props.size, 4)} solid white;
  box-shadow: 0 0 0 1px ${props => props.theme.colors.gray.base};
  border-radius: 50%;
  width: ${props => props.size};
  height: ${props => props.size};

  ${props =>
    props.selected &&
    `
    border-color: ${props.theme.colors.state.editable};
    background-color: ${props.theme.colors.gray.base};
  `}
`;

const Label = styled(Box)`
  flex: 1;
`;

const POSSIBLE_VALUE_TYPES = [
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool,
];

export default class RadioOption extends Component {
  static POSSIBLE_VALUE_TYPES = POSSIBLE_VALUE_TYPES;

  static propTypes = {
    children: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    value: PropTypes.oneOfType(POSSIBLE_VALUE_TYPES).isRequired,
    selectedValue: PropTypes.oneOfType(POSSIBLE_VALUE_TYPES),
    size: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    onClick: () => {},
    selectedValue: null,
    size: '1.5em',
    disabled: false,
  };

  static getDerivedStateFromProps(nextProps) {
    return { selected: nextProps.selectedValue === nextProps.value };
  }

  state = {
    selected: this.props.selectedValue === this.props.value,
  };

  handleClick = e => {
    e.preventDefault();

    const { onClick, value } = this.props;

    onClick(value);
  };

  render() {
    const { selected } = this.state;
    const {
      children,
      size,
      disabled,
      value: _value,
      selectedValue: _selectedValue,
      onClick: _onClick,
      ...rest
    } = this.props;

    return (
      <Container
        selected={selected}
        onClick={this.handleClick}
        role="button"
        tabIndex={0}
        disabled={disabled}
        {...rest}
      >
        <Radio selected={selected} size={size} />

        <Label>{provideChildrenWithProps(children, { selected })}</Label>
      </Container>
    );
  }
}
