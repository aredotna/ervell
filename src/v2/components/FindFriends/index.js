import React, { Component } from 'react'
import { graphql } from '@apollo/client/react/hoc'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import PropTypes from 'prop-types'
import sharify from 'sharify'

import Modal from 'v2/components/UI/Modal/Portal'
import { GenericButtonLink } from 'v2/components/UI/GenericButton'
import ConnectTwitter from 'v2/components/ConnectTwitter'
import Box from 'v2/components/UI/Box'

import TwitterAuthCheckQuery from 'v2/components/Feed/components/NoFollowingMessage/queries/followerCount'
import TwitterAuthCheckFragment from 'v2/components/Feed/components/NoFollowingMessage/fragments/followerCount'

const {
  data: { API_URL, APP_URL },
} = sharify
const TWITTER_AUTHENTICATION_URL = `${API_URL &&
  API_URL.replace('/v2', '')}/auth/twitter?origin=${APP_URL}/tools/find-friends`

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
      this.setState({ mode: 'modal' })
    }
  }

  closeModal = () => {
    this.setState({ mode: 'resting' })
  }

  handleTwitterConnectClick = e => {
    e.preventDefault()

    const {
      data: {
        me: { twitter_authentication },
      },
    } = this.props

    if (!twitter_authentication) {
      window.location.href = TWITTER_AUTHENTICATION_URL
      return null
    }

    return this.setState({ mode: 'modal' })
  }

  render() {
    const { mode } = this.state

    return (
      <Box align="center">
        {mode === 'modal' && (
          <Modal onClose={this.closeModal}>
            <ConnectTwitter />
          </Modal>
        )}
        <GenericButtonLink f={5} onClick={this.handleTwitterConnectClick} m={4}>
          Connect your Twitter account
        </GenericButtonLink>
      </Box>
    )
  }
}

export default graphql(TwitterAuthCheckQuery)(FindFriends)
