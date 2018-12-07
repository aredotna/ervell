import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty, debounce, pick, omit } from 'underscore';

import compactObject from 'react/util/compactObject';

import Box from 'react/components/UI/Box';
import Icons from 'react/components/UI/Icons';
import { Input } from 'react/components/UI/Inputs';

const OUTER_PROPS_KEYS = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'innerRef'];

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 3em;
  cursor: pointer;
`;

export default class SearchInput extends Component {
  static propTypes = {
    query: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onQueryChange: PropTypes.func,
    onDebouncedQueryChange: PropTypes.func,
    debounceWait: PropTypes.number,
    iconStates: PropTypes.shape({
      resting: PropTypes.string,
      active: PropTypes.string,
      hover: PropTypes.string,
    }),
  }

  static defaultProps = {
    query: '',
    onFocus: () => {},
    onBlur: () => {},
    onQueryChange: () => {},
    onDebouncedQueryChange: () => {},
    debounceWait: 250,
    iconStates: {
      resting: 'MagnifyingGlass',
      hover: 'MagnifyingGlass',
      focus: 'X',
      active: 'X',
    },
  }

  constructor(props) {
    super(props);

    const { debounceWait, onDebouncedQueryChange } = props;

    this.handleDebouncedQueryChange = debounce(onDebouncedQueryChange, debounceWait);

    this.state = {
      mode: 'resting',
      query: props.query,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.query) && !isEmpty(this.state.query)) {
      this.resetState();
    }
  }

  resetState = () => {
    this.setState({ query: '', mode: 'resting' });
    this.input.value = '';
    this.input.focus();
  }

  handleMouseOver = () => {
    const { mode } = this.state;
    if (mode === 'active' || mode === 'focus') { return; }

    this.setState({ mode: 'hover' });
  }

  handleMouseOut = () => {
    const { mode } = this.state;
    if (mode === 'active' || mode === 'focus') { return; }

    this.setState({ mode: 'resting' });
  }

  handleFocus = () => {
    const { mode } = this.state;
    if (mode === 'active') { return; }
    this.setState({ mode: 'focus' });
  }

  handleBlur = () => {
    const { mode } = this.state;
    if (mode === 'active') { return; }
    this.setState({ mode: 'resting' });
  }

  handleChange = ({ target: { value: query } }) => {
    const currentState = { query, mode: 'active' };

    if (isEmpty(query)) {
      currentState.mode = 'resting';
    }

    this.setState(currentState);
    this.props.onQueryChange(query);
    this.handleDebouncedQueryChange(query);
  }

  handleReset = () => {
    this.resetState();
    this.props.onQueryChange('');
    this.props.onDebouncedQueryChange('');
  }

  render() {
    const {
      query: _query,
      onFocus,
      onBlur,
      onQueryChange: _onQueryChange,
      onDebouncedQueryChange: _onDebouncedQueryChange,
      debounceWait: _debounceWait,
      iconStates,
      ...rest
    } = this.props;

    const { mode, query } = this.state;

    const outerProps = compactObject(pick(rest, ...OUTER_PROPS_KEYS));
    const innerProps = omit(rest, ...OUTER_PROPS_KEYS);

    return (
      <Box
        position="relative"
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...outerProps}
      >
        <Icon onClick={this.handleReset}>
          <Icons
            color="gray.medium"
            name={iconStates[mode]}
            size={6}
          />
        </Icon>

        <Input
          px="3em"
          borderColor="gray.regular"
          {...innerProps}
          innerRef={(input) => { this.input = input; }}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={this.handleChange}
          defaultValue={query}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </Box>
    );
  }
}
