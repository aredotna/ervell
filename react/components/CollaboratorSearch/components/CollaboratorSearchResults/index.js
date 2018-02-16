import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import isEmail from 'lib/is_email.coffee';

import collaboratorSearchQuery from 'react/components/CollaboratorSearch/queries/collaboratorSearch';
import collaboratorSearchResultFragment from 'react/components/CollaboratorSearch/components/CollaboratorSearchResults/fragments/collaboratorSearchResult';

import SearchResult from 'react/components/CollaboratorSearch/components/SearchResult';
import CollaboratorSearchResult from 'react/components/CollaboratorSearch/components/CollaboratorSearchResult';
import CollaboratorInviteButton from 'react/components/CollaboratorSearch/components/CollaboratorInviteButton';

const Status = styled(SearchResult)`
  justify-content: center;
  padding: 1.75em 1em;
`;

class CollaboratorSearchResults extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    channel_id: PropTypes.number.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      results: PropTypes.arrayOf(propType(collaboratorSearchResultFragment)),
    }).isRequired,
  }

  render() {
    const {
      data: { loading }, channel_id, onAdd, query,
    } = this.props;

    if (isEmail(query)) {
      return (
        <CollaboratorInviteButton
          email={query}
          onAdd={onAdd}
          channel_id={channel_id}
        />
      );
    }

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
