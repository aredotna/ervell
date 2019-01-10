import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import axios from 'axios';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';
import sharify from 'sharify';

import Modal from 'react/components/UI/Modal/Portal';
import Text from 'react/components/UI/Text';
import PageContainer from 'react/components/UI/PageContainer';
import { GenericButton } from 'react/components/UI/GenericButton';
import ConnectTwitter from 'react/components/ConnectTwitter';

import hasSeenTwitterConnectMutation from 'react/pages/feed/components/EmptyConnectTwitter/mutations/hasSeenTwitterConnect';

import EmptyFeedConnectTwitterQuery from 'react/pages/feed/components/EmptyConnectTwitter/queries/emptyFeedConnectTwitter';

import emptyFeedConnectTwitterFragment from 'react/pages/feed/components/EmptyConnectTwitter/fragments/emptyFeedConnectTwitter';

const { data: { API_URL, APP_URL } } = sharify;
const TWITTER_AUTHENTICATION_URL = `${API_URL.replace('/v2', '')}/auth/twitter?origin=${APP_URL}/feed/find-friends`;

const ActionContainer = styled.div`
  text-align: center;
  padding: ${x => x.theme.space[7]} 0;
`;

const Headline = styled(Text).attrs({
  fontSize: 7,
  lineHeight: 1,
  align: 'center',
})`
`;

const SmallText = styled(Text).attrs({
  fontSize: 3,
  lineHeight: 1,
  mt: 4,
})``;

const Link = styled(SmallText)`
  text-decoration: underline;
  cursor: pointer;
  display: inline-block;
`;

class EmptyConnectTwitter extends Component {
  static propTypes = {
    data: PropTypes.shape({
      me: propType(emptyFeedConnectTwitterFragment),
    }).isRequired,
    hasSeenTwitterConnect: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  componentDidMount() {
    if (window.location.href.indexOf('showModal=true') > -1) {
      this.setState({ mode: 'modal' });
    }
  }

  hasSeenTwitterConnectAndRefresh = (e) => {
    e.preventDefault();

    const { hasSeenTwitterConnect } = this.props;

    hasSeenTwitterConnect()
      .then(() => axios.get('/me/refresh'))
      .then(() => { window.location.reload(true); });
  }

  closeModal = () => {
    this.setState({ mode: 'resting' });
  }

  handleConnectClick = (e) => {
    e.preventDefault();

    const { data: { me: { twitter_authentication } } } = this.props;

    if (!twitter_authentication) {
      window.location.href = TWITTER_AUTHENTICATION_URL;
      return null;
    }

    return this.setState({ mode: 'modal' });
  }

  render() {
    const { mode } = this.state;

    return (
      <PageContainer>
        {mode === 'modal' &&
          <Modal onClose={this.closeModal}>
            <ConnectTwitter onDone={this.hasSeenTwitterConnectAndRefresh} />
          </Modal>
        }

        <Headline>
          You aren&apos;t following anyone yet.<br />
          Do you want to search your Twitter contacts to find friends on Are.na?
        </Headline>

        <ActionContainer>
          <GenericButton onClick={this.handleConnectClick}>
            Connect to Twitter
          </GenericButton>

          <SmallText>
            No, just take me to <Link onClick={this.hasSeenTwitterConnectAndRefresh}>my feed</Link>.
          </SmallText>
        </ActionContainer>
      </PageContainer>
    );
  }
}

export default compose(
  graphql(EmptyFeedConnectTwitterQuery),
  graphql(hasSeenTwitterConnectMutation, { name: 'hasSeenTwitterConnect' }),
)(EmptyConnectTwitter);
