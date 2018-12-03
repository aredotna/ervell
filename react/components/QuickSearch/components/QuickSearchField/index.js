import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty, debounce } from 'underscore';

import Box from 'react/components/UI/Box';
import Icons from 'react/components/UI/Icons';
import { Input } from 'react/components/UI/Inputs';

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 2.5em;
  cursor: pointer;
`;

const SearchInput = styled(Input)`
  border-color: transparent;

  ${props => props.focus && 'border-color: transparent;'}
  &:focus {
    border-color: transparent;
  }
`;

export default class QuickSearchField extends Component {
  static propTypes = {
    query: PropTypes.string,
    onQueryChange: PropTypes.func,
    onDebouncedQueryChange: PropTypes.func,
    debounceWait: PropTypes.number,
  }

  static defaultProps = {
    query: '',
    onQueryChange: () => {},
    onDebouncedQueryChange: () => {},
    debounceWait: 250,
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

  handleChange = ({ target: { value: query } }) => {
    const currentState = { query, mode: 'active' };

    if (isEmpty(query)) {
      currentState.mode = 'resting';
    }

    this.setState(currentState);
    this.props.onQueryChange(query);
    this.handleDebouncedQueryChange(query);
  }

  handleMouseEnter = () => {
    this.setState({ mode: 'active' });
  }

  handleMouseLeave = () => {
    const { query } = this.state;

    if (query.length > 0) { return; }

    this.setState({ mode: 'resting' });
  }

  handleReset = () => {
    this.resetState();
    this.props.onQueryChange('');
    this.props.onDebouncedQueryChange('');
  }

  render() {
    const {
      query: _query,
      onQueryChange: _onQueryChange,
      onDebouncedQueryChange: _onDebouncedQueryChange,
      debounceWait: _debounceWait,
      ...rest
    } = this.props;

    const { mode, query } = this.state;

    return (
      <Box position="relative">
        <Icon onClick={this.handleReset}>
          <Icons
            color="gray.medium"
            size={{
              resting: 7,
              active: 6,
            }[mode]}
            name={{
              resting: 'ArenaMark',
              active: 'X',
            }[mode]}
          />
        </Icon>

        <SearchInput
          px="2.5em"
          borderColor="gray.regular"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          innerRef={(input) => { this.input = input; }}
          onChange={this.handleChange}
          defaultValue={query}
          {...rest}
        />
      </Box>
    );
  }
}
