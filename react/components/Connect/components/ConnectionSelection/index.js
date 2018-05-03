import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'underscore';

import Styles from 'react/styles';

import GenericInput, { inputPadding } from 'react/components/UI/GenericInput';
import RecentChannels from 'react/components/Connect/components/ConnectionSelection/components/RecentChannels';
import SearchedChannels from 'react/components/Connect/components/ConnectionSelection/components/SearchedChannels';
import CreatePrivateChannelButton from 'react/components/Connect/components/ConnectionSelection/components/CreatePrivateChannelButton';

const Container = styled.div`
  &[data-mode="active"] {
    position: relative;

    &:after {
      ${Styles.Mixins.outlineBorder()}
    }
  }
`;

const Bumper = styled.div`
  text-align: center;
  padding: ${inputPadding};
`;

const SearchInput = styled(GenericInput).attrs({
  size: 'xs',
  placeholder: 'Type channel name',
  autoFocus: true,
})`
  &,
  &:focus {
    border: 1px solid ${Styles.Colors.gray.regular} !important;
  }
`;

const OutlinedRecentChannels = styled(RecentChannels)`
  position: relative;

  &:after {
    ${Styles.Mixins.outlineBorder()}
  }
`;

export default class ConnectionSelection extends Component {
  static propTypes = {
    onConnectionSelection: PropTypes.func,
  }

  static defaultProps = {
    onConnectionSelection: () => {},
  }

  state = {
    query: '',
    mode: 'resting',
  }

  handleChange = ({ target: { value: query } }) => {
    const mode = isEmpty(query) ? 'resting' : 'active';
    this.setState({ mode, query });
  }

  render() {
    const { query, mode } = this.state;
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
              query={query}
              onConnectionSelection={onConnectionSelection}
            />
          </div>
        }
      </Container>
    );
  }
}
