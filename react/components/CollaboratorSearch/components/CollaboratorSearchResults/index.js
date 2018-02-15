import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import collaboratorSearchQuery from 'react/components/CollaboratorSearch/queries/collaboratorSearch';
import collaboratorSearchResultFragment from 'react/components/CollaboratorSearch/components/CollaboratorSearchResults/fragments/collaboratorSearchResult';

import SearchResult from 'react/components/CollaboratorSearch/components/SearchResult';
import CollaboratorSearchResult from 'react/components/CollaboratorSearch/components/CollaboratorSearchResult';

const Status = styled(SearchResult)`
  justify-content: center;
  padding: 1.75em 1em;
`;

class CollaboratorSearchResults extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    channel_id: PropTypes.number.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      results: PropTypes.arrayOf(propType(collaboratorSearchResultFragment)),
    }).isRequired,
  }

  render() {
    const { data: { loading }, channel_id, onAdd } = this.props;

    if (loading) {
      return (
        <Status>
          Searching...
        </Status>
      );
    }

    const { data: { results } } = this.props;

    if (results.length === 0) {
      return (
        <Status>
          Nothing found.
        </Status>
      );
    }

    return (
      <div>
        {results.map(result => (
          <CollaboratorSearchResult
            key={result.id}
            result={result}
            channel_id={channel_id}
            onAdd={onAdd}
          />
        ))}
      </div>
    );
  }
}

export default graphql(collaboratorSearchQuery)(CollaboratorSearchResults);
