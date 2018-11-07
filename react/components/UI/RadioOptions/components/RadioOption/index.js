import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import provideChildrenWithProps from 'react/util/provideChildrenWithProps';

import Box from 'react/components/UI/Box';

const Container = styled(Box).attrs({
  p: 4,
})`
  display: flex;
  flex-direction: row;
  cursor: pointer;

  ${props => props.selected && `
    background-color: ${props.theme.colors.state.editable};
  `}
`;

const Radio = styled(Box).attrs({
  mr: 6,
})`
  border: 0.34375em solid white;
  box-shadow: 0 0 0 1px ${props => props.theme.colors.gray.base};
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;

  ${props => props.selected && `
    border-color: ${props.theme.colors.state.editable};
    background-color: ${props.theme.colors.gray.base};
  `}
`;

const POSSIBLE_VALUE_TYPES = [PropTypes.string, PropTypes.number, PropTypes.bool];

export default class RadioOption extends Component {
  static POSSIBLE_VALUE_TYPES = POSSIBLE_VALUE_TYPES

  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    value: PropTypes.oneOfType(POSSIBLE_VALUE_TYPES).isRequired,
    selectedValue: PropTypes.oneOfType(POSSIBLE_VALUE_TYPES),
  }

  static defaultProps = {
    onClick: () => {},
    selectedValue: null,
  }

  static getDerivedStateFromProps(nextProps) {
    return { selected: nextProps.selectedValue === nextProps.value };
  }

  state = {
    selected: this.props.selectedValue === this.props.value,
  }

  handleClick = (e) => {
    e.preventDefault();

    const { onClick, value } = this.props;

    onClick(value);
  }

  render() {
    const { selected } = this.state;
    const { children } = this.props;

    return (
      <Container selected={selected} onClick={this.handleClick} role="button" tabIndex={0}>
        <Radio selected={selected} />

        <div>
          {provideChildrenWithProps(children, { selected })}
        </div>
      </Container>
    );
  }
}
