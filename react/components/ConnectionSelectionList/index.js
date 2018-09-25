import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { debounce, isEmpty } from 'underscore';

import { outlineBorder } from 'react/styles/mixins';

import { Input, inputPadding } from 'react/components/UI/Inputs';
import RecentChannels from 'react/components/ConnectionSelectionList/components/RecentChannels';
import SearchedChannels from 'react/components/ConnectionSelectionList/components/SearchedChannels';
import CreatePrivateChannelButton from 'react/components/ConnectionSelectionList/components/CreatePrivateChannelButton';

const Container = styled.div`
  &[data-mode="active"] {
    position: relative;

    &:after {
      ${outlineBorder()}
    }
  }
`;

const Bumper = styled.div`
  text-align: center;
  padding: ${inputPadding}; // TODO
`;

const SearchInput = styled(Input).attrs({
  f: 1,
  placeholder: 'Type channel name',
  autoFocus: true,
})`
  &,
  &:focus {
    border: 1px solid ${x => x.theme.colors.gray.regular} !important;
  }
`;

const OutlinedRecentChannels = styled(RecentChannels)`
  position: relative;

  &:after {
    ${outlineBorder()}
  }
`;

export default class ConnectionSelectionList extends Component {
  static propTypes = {
    onConnectionSelection: PropTypes.func,
  }

  static defaultProps = {
    onConnectionSelection: () => {},
  }

  state = {
    query: '',
    debouncedQuery: '',
    mode: 'resting',
  }

  handleChange = ({ target: { value: query } }) => {
    const mode = isEmpty(query) ? 'resting' : 'active';
    this.setState({ mode, query });
    this.debouceQuery(query);
  }

  debouceQuery = debounce((debouncedQuery) => {
    this.setState({ debouncedQuery });
  }, 200)

  render() {
    const { query, debouncedQuery, mode } = this.state;
    const { onConnectionSelection } = this.props;

    return (
      <Container data-mode={mode}>
        <SearchInput onChange={this.handleChange} />

        {mode === 'resting' &&
          <div>
            <Bumper>Recent channels</Bumper>

            <OutlinedRecentChannels
              onConnectionSelection={onConnectionSelection}
            />
          </div>
        }

        {mode === 'active' &&
          <div>
            <CreatePrivateChannelButton
              title={query}
              onConnectionCreation={onConnectionSelection}
            />

            <SearchedChannels
              query={debouncedQuery}
              onConnectionSelection={onConnectionSelection}
            />
          </div>
        }
      </Container>
    );
  }
}
