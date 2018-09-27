import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { debounce, isEmpty } from 'underscore';

import { __outlineBorder__ } from 'react/styles/mixins';

import { Input } from 'react/components/UI/Inputs';
import Text from 'react/components/UI/Text';
import RecentChannels from 'react/components/ConnectionSelectionList/components/RecentChannels';
import SearchedChannels from 'react/components/ConnectionSelectionList/components/SearchedChannels';
import CreatePrivateChannelButton from 'react/components/ConnectionSelectionList/components/CreatePrivateChannelButton';

const Container = styled.div`
  position: relative;

  ${x => x.mode === 'active' && x.outline && `
    &:after {
      ${__outlineBorder__()}
    }
  `}
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

  ${x => x.outline && `
    &:after {
      ${__outlineBorder__()}
    }
  `}
`;

export default class ConnectionSelectionList extends Component {
  static propTypes = {
    outline: PropTypes.bool,
    onConnectionSelection: PropTypes.func,
  }

  static defaultProps = {
    outline: true,
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
    const { outline, onConnectionSelection } = this.props;

    return (
      <Container mode={mode} outline={outline}>
        <SearchInput onChange={this.handleChange} />

        {mode === 'resting' &&
          <div>
            <Text f={1} py={4} px={5} textAlign="center" color="gray.medium">
              Recent channels
            </Text>

            <OutlinedRecentChannels
              outline={outline}
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
