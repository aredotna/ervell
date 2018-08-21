import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import axios from 'axios';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';
import sharify from 'sharify';

import Modal from 'react/components/UI/Modal';
import Text from 'react/components/UI/Text';
import PageContainer from 'react/components/UI/PageContainer';
import ConnectTwitter from 'react/components/ConnectTwitter/index';
import { GenericButton } from 'react/components/UI/GenericButton';
import updateFlagMutation from 'react/pages/feed/EmptyConnectTwitter/mutations/index';

import EmptyFeedConnectTwitterQuery from 'react/pages/feed/EmptyConnectTwitter/queries/index';
import EmptyFeedCheckFragment from 'react/pages/feed/EmptyConnectTwitter/fragments/index';

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

class EmptyConnectTwitterPage extends Component {
  static propTypes = {
    data: PropTypes.shape({
      me: propType(EmptyFeedCheckFragment),
    }).isRequired,
    showModal: PropTypes.bool,
    updateFlag: PropTypes.func.isRequired,
  }

  static defaultProps = {
    showModal: false,
  }

  updateFlagAndRefresh = (e) => {
    e.preventDefault();

    const { updateFlag } = this.props;

    updateFlag({
      variables: {
        name: 'HAS_SEEN_FEED_CONNECT_TWITTER',
        value: true,
      },
    })
      .then(() => axios.get('/me/refresh'))
      .then(() => { window.location.reload(true); });
  }

  openModal = () => {
    const modal = new Modal(ConnectTwitter, { onDone: this.updateFlagAndRefresh });
    modal.open();
  }

  handleConnectClick = () => {
    const { data: { error } } = this.props;
    //
    // If an authentication is not found,
    // we need to do the auth dance with Twitter first
    //
    if (error && error.graphQLErrors && error.graphQLErrors[0].extensions.code === 'NOT_FOUND') {
      const { data: { API_URL, APP_URL } } = sharify;

      window.location.href = `${API_URL.replace('/v2', '')}/auth/twitter?origin=${APP_URL}/feed/find-friends`;

      return false;
    }
    return this.openModal();
  }

  render() {
    const { showModal } = this.props;

    if (showModal) {
      this.openModal();
    }

    return (
      <PageContainer>
        <Headline>
          You aren&apos;t following anyone yet.<br />
          Do you want to search your Twitter contacts to find friends on Are.na?
        </Headline>
        <ActionContainer>
          <GenericButton onClick={this.handleConnectClick}>
            Connect to Twitter
          </GenericButton>
          <SmallText>
            No, just take me to <Link onClick={this.updateFlagAndRefresh}>my feed</Link>.
          </SmallText>
        </ActionContainer>
      </PageContainer>
    );
  }
}

export default compose(
  graphql(EmptyFeedConnectTwitterQuery),
  graphql(updateFlagMutation, { name: 'updateFlag' }),
)(EmptyConnectTwitterPage);
