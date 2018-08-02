import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'underscore';

import { Input } from 'react/components/UI/Inputs';

const Container = styled.div`
  position: relative;
  pointer-events: none;
  overflow: hidden;
`;

const Icon = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 1em 0;
  margin-top: 0.125em;
  cursor: pointer;
  pointer-events: all;
  width: 2.5em;
  text-align: center;
  color: ${x => x.theme.colors.gray.medium};

  // TODO: Replace with SVG
  &:after {
    font-family: 'Iconic';
    content: '\\e1cf'; // magnifying-glass glyph
  }

  // TODO: Replace with SVG
  &[data-mode='active'] {
    &:after {
      content: '\\e233'; // x- glyph
    }
  }
`;

const SearchField = styled(Input)`
  padding-left: 2.5em;
  border: 1px solid ${x => x.theme.colors.gray.regular};

  &:focus {
    border: 1px solid ${x => x.theme.colors.gray.regular};
  }
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
        <Icon onClick={this.handleReset} data-mode={mode} />

        <SearchField
          {...this.props}
          innerRef={(input) => { this.input = input; }}
          onChange={this.handleChange}
          value={query}
        />
      </Container>
    );
  }
}
