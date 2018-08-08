import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'underscore';

import Icons from 'react/components/UI/Icons';
import { Input } from 'react/components/UI/Inputs';

const Container = styled.div`
  position: relative;
`;

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

export default class SearchInput extends Component {
  static propTypes = {
    query: PropTypes.string,
    onQueryChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    query: '',
  }

  constructor(props) {
    super(props);

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
    this.input.focus();
  }

  handleChange = ({ target: { value: query } }) => {
    const currentState = { query, mode: 'active' };

    if (isEmpty(query)) {
      currentState.mode = 'resting';
    }

    this.setState(currentState);
    this.props.onQueryChange(query);
  }

  handleReset = () => {
    this.resetState();
    this.props.onQueryChange('');
  }

  render() {
    const { mode, query } = this.state;

    return (
      <Container>
        <Icon onClick={this.handleReset}>
          <Icons
            color="gray.medium"
            name={{
              resting: 'MagnifyingGlass',
              active: 'X',
            }[mode]}
          />
        </Icon>

        <Input
          px="2.5em"
          borderColor="gray.regular"
          {...this.props}
          innerRef={(input) => { this.input = input; }}
          onChange={this.handleChange}
          value={query}
        />
      </Container>
    );
  }
}
