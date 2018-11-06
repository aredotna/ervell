import React, { Component } from 'react';
import PropTypes from 'prop-types';

import provideChildrenWithProps from 'react/util/provideChildrenWithProps';

import RadioOption from 'react/components/UI/RadioOptions/components/RadioOption';

export default class RadioOptions extends Component {
  static Option = RadioOption;

  static propTypes = {
    children: PropTypes.node.isRequired,
    onSelect: PropTypes.func,
    value: PropTypes.oneOfType(RadioOption.POSSIBLE_VALUE_TYPES),
  }

  static defaultProps = {
    onSelect: () => {},
    value: null,
  }

  state = {
    value: this.props.value,
  }

  handleClick = (value) => {
    const { onSelect } = this.props;

    this.setState({ value });

    return onSelect(value);
  }

  render() {
    const {
      children, onSelect: _onSelect, value: _value, ...rest
    } = this.props;

    return (
      <div {...rest}>
        {provideChildrenWithProps(children, {
          onClick: this.handleClick,
          selectedValue: this.state.value,
          ...rest,
        })}
      </div>
    );
  }
}
