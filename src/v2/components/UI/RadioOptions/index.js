import React, { Component } from 'react';
import PropTypes from 'prop-types';

import provideChildrenWithProps from 'v2/util/provideChildrenWithProps';

import RadioOption from 'v2/components/UI/RadioOptions/components/RadioOption';

export default class RadioOptions extends Component {
  static Option = RadioOption;

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    onSelect: PropTypes.func,
    value: PropTypes.oneOfType(RadioOption.POSSIBLE_VALUE_TYPES),
    size: PropTypes.string,
  };

  static defaultProps = {
    onSelect: () => {},
    value: null,
    size: '1.5em',
  };

  state = {
    value: this.props.value,
  };

  handleClick = value => {
    const { onSelect } = this.props;

    this.setState({ value });

    return onSelect(value);
  };

  render() {
    const {
      children,
      onSelect: _onSelect,
      value: _value,
      ...rest
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
