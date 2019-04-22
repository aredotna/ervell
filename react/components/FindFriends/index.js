import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';
import sharify from 'sharify';

import Modal from 'react/components/UI/Modal/Portal';
import { GenericButtonLink } from 'react/components/UI/GenericButton';
import ConnectTwitter from 'react/components/ConnectTwitter';
import Box from 'react/components/UI/Box';

import TwitterAuthCheckQuery from 'react/components/Feed/components/NoFollowingMessage/queries/followerCount';
import TwitterAuthCheckFragment from 'react/components/Feed/components/NoFollowingMessage/fragments/followerCount';

const { data: { API_URL, APP_URL } } = sharify;
const TWITTER_AUTHENTICATION_URL = `${(API_URL && API_URL.replace('/v2', ''))}/auth/twitter?origin=${APP_URL}/tools/find-friends`;

class FindFriends extends Component {
  static propTypes = {
    data: PropTypes.shape({
      me: propType(TwitterAuthCheckFragment),
    }).isRequired,
  }

  state = {
    mode: 'resting',
  }

  componentDidMount() {
    if (window.location.href.indexOf('showModal=true') > -1) {
      this.setState({ mode: 'modal' });
    }
  }

  closeModal = () => {
    this.setState({ mode: 'resting' });
  }

  handleTwitterConnectClick = (e) => {
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
      <Box align="center">
        {mode === 'modal' &&
          <Modal onClose={this.closeModal}>
            <ConnectTwitter />
          </Modal>
        }
        <GenericButtonLink f={5} onClick={this.handleTwitterConnectClick} m={4}>
          Connect your Twitter account
        </GenericButtonLink>
      </Box>
    );
  }
}

export default graphql(TwitterAuthCheckQuery)(FindFriends);

