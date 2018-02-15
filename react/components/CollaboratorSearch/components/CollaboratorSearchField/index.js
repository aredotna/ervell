import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from 'react/styles';

const SearchInput = styled.input`
  border: 1px solid ${Styles.Colors.gray.regular};

  &:focus {
    border: 1px solid ${Styles.Colors.gray.regular};
  }
`;

export default class CollaboratorSearch extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
  }

  update = ({ target: { value: query } }) => {
    this.props.onChange(query);
  }

  render() {
    const { query } = this.props;

    return (
      <SearchInput
        className="Input"
        value={query}
        onChange={this.update}
        placeholder="search users or enter an email address"
        autoFocus
      />
    );
  }
}
