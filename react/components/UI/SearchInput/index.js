import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty, debounce, pick, omit } from 'underscore';

import compactObject from 'react/util/compactObject';

import Box from 'react/components/UI/Box';
import Icons from 'react/components/UI/Icons';
import { Input } from 'react/components/UI/Inputs';

const OUTER_PROPS_KEYS = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'flex'];

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

class SearchInput extends PureComponent {
  static propTypes = {
    query: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onQueryChange: PropTypes.func,
    onDebouncedQueryChange: PropTypes.func,
    debounceWait: PropTypes.number,
    forwardRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any }),
    ]),
    iconMap: PropTypes.shape({
      resting: PropTypes.string,
      hover: PropTypes.string,
      active: PropTypes.string,
    }),
  }

  static defaultProps = {
    query: '',
    onFocus: () => {},
    onBlur: () => {},
    onQueryChange: () => {},
    onDebouncedQueryChange: () => {},
    debounceWait: 250,
    forwardRef: null,
    iconMap: {
      resting: 'MagnifyingGlass',
      hover: 'MagnifyingGlass',
      active: 'X',
    },
  }

  constructor(props) {
    super(props);

    const { debounceWait, onDebouncedQueryChange } = props;

    this.handleDebouncedQueryChange = debounce(onDebouncedQueryChange, debounceWait);

    this.state = {
      mode: props.query && props.query !== '' ? 'active' : 'resting',
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
      forwardRef,
      iconMap,
      ...rest
    } = this.props;

    const { mode, query } = this.state;

    const outerProps = compactObject(pick(rest, ...OUTER_PROPS_KEYS));
    const innerProps = omit(rest, ...OUTER_PROPS_KEYS);

    return (
      <Box
        position="relative"
        ref={forwardRef}
        {...outerProps}
      >
        <Icon onClick={this.handleReset}>
          <Icons
            width="1.5em"
            height="0.88em"
            color="gray.medium"
            name={iconMap[mode]}
          />
        </Icon>

        <Input
          px="2.5em"
          borderColor="gray.regular"
          {...innerProps}
          ref={(input) => { this.input = input; }}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={this.handleChange}
          defaultValue={query}
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </Box>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <SearchInput forwardRef={ref} {...props} />));
